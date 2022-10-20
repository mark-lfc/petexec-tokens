const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session')
const port = 3000;
const path = require('path');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@dt-tokens.5sd5vkj.mongodb.net/?retryWrites=true&w=majority');
}

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'puppies',
    resave: false,
    saveUninitialized: true
}));


/*
    HOME
*/
app.get('/', (req, res) => {
    res.render('home');
})

/*
    LOGIN
*/
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    bcrypt.compare(password, user.password).then(function(result) {
        if(result) {
            req.session.user_id = user._id;
            res.redirect('/');
        }
        else {
            res.send('Not Authorized');
        }
    });
})

/*
    Requires Authentication for Routes Below
*/
app.use(function(req, res, next) {
    if(!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        next();
    }
})

/*
    DOGTOPIA SOUTH WATERFRONT
*/
app.get('/swf', (req, res) => {
    res.render('dogtopia_swf/permissions', {
        location: 'Dogtopia South Waterfront',
        title: 'Permissions'
    });
})

app.get('/swf/boarding', (req, res) => {
    res.render('dogtopia_swf/boarding', {
        location: 'Dogtopia South Waterfront',
        title: 'Boarding Read'
    });
})

app.get('/swf/calendar', (req, res) => {
    res.render('dogtopia_swf/calendar', {
        location: 'Dogtopia South Waterfront',
        title: 'Calendar Read'
    });
})

app.get('/swf/daycare', (req, res) => {
    res.render('dogtopia_swf/daycare', {
        location: 'Dogtopia South Waterfront',
        title: 'Daycare Read'
    });
})

app.get('/swf/grooming', (req, res) => {
    res.render('dogtopia_swf/grooming', {
        location: 'Dogtopia South Waterfront',
        title: 'Grooming Read'
    });
})

app.get('/swf/owner', (req, res) => {
    res.render('dogtopia_swf/owner', {
        location: 'Dogtopia South Waterfront',
        title: 'Owner Read'
    });
})

app.get('/swf/package', (req, res) => {
    res.render('dogtopia_swf/package', {
        location: 'Dogtopia South Waterfront',
        title: 'Package Read'
    });
})

app.get('/swf/pet', (req, res) => {
    res.render('dogtopia_swf/pet', {
        location: 'Dogtopia South Waterfront',
        title: 'Pet Read'
    });
})

app.get('/swf/report', (req, res) => {
    res.render('dogtopia_swf/report', {
        location: 'Dogtopia South Waterfront',
        title: 'Report Read'
    });
})

/*
    REGISTER
*/
app.get('/register', (req, res) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    }
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})


/*
    SERVER
*/
app.listen(port, () => {
    console.log('Local server is live on Port 3000');
})