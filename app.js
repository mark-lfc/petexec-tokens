const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session')
const port = process.env.PORT || 3000;
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
    Requires Authentication to Access Routes Below
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
    DOGTOPIA SOUTH WATERFRONT ROUTES
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

app.get('/swf/scheduled_service', (req, res) => {
    res.render('dogtopia_swf/scheduled_service', {
        location: 'Dogtopia South Waterfront',
        title: 'Scheduled Service Read'
    });
})

/*
    DOGTOPIA LAKE OSWEGO ROUTES
*/
app.get('/lo', (req, res) => {
    res.render('dogtopia_lo/permissions', {
        location: 'Dogtopia Lake Oswego',
        title: 'Permissions'
    });
})

app.get('/lo/boarding', (req, res) => {
    res.render('dogtopia_lo/boarding', {
        location: 'Dogtopia Lake Oswego',
        title: 'Boarding Read'
    });
})

app.get('/lo/calendar', (req, res) => {
    res.render('dogtopia_lo/calendar', {
        location: 'Dogtopia Lake Oswego',
        title: 'Calendar Read'
    });
})

app.get('/lo/daycare', (req, res) => {
    res.render('dogtopia_lo/daycare', {
        location: 'Dogtopia Lake Oswego',
        title: 'Daycare Read'
    });
})

app.get('/lo/grooming', (req, res) => {
    res.render('dogtopia_lo/grooming', {
        location: 'Dogtopia Lake Oswego',
        title: 'Grooming Read'
    });
})

app.get('/lo/owner', (req, res) => {
    res.render('dogtopia_lo/owner', {
        location: 'Dogtopia Lake Oswego',
        title: 'Owner Read'
    });
})

app.get('/lo/package', (req, res) => {
    res.render('dogtopia_lo/package', {
        location: 'Dogtopia Lake Oswego',
        title: 'Package Read'
    });
})

app.get('/lo/pet', (req, res) => {
    res.render('dogtopia_lo/pet', {
        location: 'Dogtopia Lake Oswego',
        title: 'Pet Read'
    });
})

app.get('/lo/report', (req, res) => {
    res.render('dogtopia_lo/report', {
        location: 'Dogtopia Lake Oswego',
        title: 'Report Read'
    });
})

app.get('/lo/scheduled_service', (req, res) => {
    res.render('dogtopia_lo/scheduled_service', {
        location: 'Dogtopia Lake Oswego',
        title: 'Scheduled Service Read'
    });
})

/*
    DOGTOPIA PEARL DISTRICT ROUTES
*/
app.get('/pearl', (req, res) => {
    res.render('dogtopia_pearl/permissions', {
        location: 'Dogtopia Pearl District',
        title: 'Permissions'
    });
})

app.get('/pearl/boarding', (req, res) => {
    res.render('dogtopia_pearl/boarding', {
        location: 'Dogtopia Pearl District',
        title: 'Boarding Read'
    });
})

app.get('/pearl/calendar', (req, res) => {
    res.render('dogtopia_pearl/calendar', {
        location: 'Dogtopia Pearl District',
        title: 'Calendar Read'
    });
})

app.get('/pearl/daycare', (req, res) => {
    res.render('dogtopia_pearl/daycare', {
        location: 'Dogtopia Pearl District',
        title: 'Daycare Read'
    });
})

app.get('/pearl/grooming', (req, res) => {
    res.render('dogtopia_pearl/grooming', {
        location: 'Dogtopia Pearl District',
        title: 'Grooming Read'
    });
})

app.get('/pearl/owner', (req, res) => {
    res.render('dogtopia_pearl/owner', {
        location: 'Dogtopia Pearl District',
        title: 'Owner Read'
    });
})

app.get('/pearl/package', (req, res) => {
    res.render('dogtopia_pearl/package', {
        location: 'Dogtopia Pearl District',
        title: 'Package Read'
    });
})

app.get('/pearl/pet', (req, res) => {
    res.render('dogtopia_pearl/pet', {
        location: 'Dogtopia Pearl District',
        title: 'Pet Read'
    });
})

app.get('/pearl/report', (req, res) => {
    res.render('dogtopia_pearl/report', {
        location: 'Dogtopia Pearl District',
        title: 'Report Read'
    });
})

app.get('/pearl/scheduled_service', (req, res) => {
    res.render('dogtopia_pearl/scheduled_service', {
        location: 'Dogtopia Pearl District',
        title: 'Scheduled Service Read'
    });
})

/*
    DOGTOPIA CEDAR MILLS ROUTES
*/
app.get('/cm', (req, res) => {
    res.render('dogtopia_cm/permissions', {
        location: 'Dogtopia Cedar Mills',
        title: 'Permissions'
    });
})

app.get('/cm/boarding', (req, res) => {
    res.render('dogtopia_cm/boarding', {
        location: 'Dogtopia Cedar Mills',
        title: 'Boarding Read'
    });
})

app.get('/cm/calendar', (req, res) => {
    res.render('dogtopia_cm/calendar', {
        location: 'Dogtopia Cedar Mills',
        title: 'Calendar Read'
    });
})

app.get('/cm/daycare', (req, res) => {
    res.render('dogtopia_cm/daycare', {
        location: 'Dogtopia Cedar Mills',
        title: 'Daycare Read'
    });
})

app.get('/cm/grooming', (req, res) => {
    res.render('dogtopia_cm/grooming', {
        location: 'Dogtopia Cedar Mills',
        title: 'Grooming Read'
    });
})

app.get('/cm/owner', (req, res) => {
    res.render('dogtopia_cm/owner', {
        location: 'Dogtopia Cedar Mills',
        title: 'Owner Read'
    });
})

app.get('/cm/package', (req, res) => {
    res.render('dogtopia_cm/package', {
        location: 'Dogtopia Cedar Mills',
        title: 'Package Read'
    });
})

app.get('/cm/pet', (req, res) => {
    res.render('dogtopia_cm/pet', {
        location: 'Dogtopia Cedar Mills',
        title: 'Pet Read'
    });
})

app.get('/cm/report', (req, res) => {
    res.render('dogtopia_cm/report', {
        location: 'Dogtopia Cedar Mills',
        title: 'Report Read'
    });
})

app.get('/cm/scheduled_service', (req, res) => {
    res.render('dogtopia_cm/scheduled_service', {
        location: 'Dogtopia Cedar Mills',
        title: 'Scheduled Service Read'
    });
})

/*
    DOGTOPIA SAN MARCOS ROUTES
*/
app.get('/sm', (req, res) => {
    res.render('dogtopia_sm/permissions', {
        location: 'Dogtopia San Marcos',
        title: 'Permissions'
    });
})

app.get('/sm/boarding', (req, res) => {
    res.render('dogtopia_sm/boarding', {
        location: 'Dogtopia San Marcos',
        title: 'Boarding Read'
    });
})

app.get('/sm/calendar', (req, res) => {
    res.render('dogtopia_sm/calendar', {
        location: 'Dogtopia San Marcos',
        title: 'Calendar Read'
    });
})

app.get('/sm/daycare', (req, res) => {
    res.render('dogtopia_sm/daycare', {
        location: 'Dogtopia San Marcos',
        title: 'Daycare Read'
    });
})

app.get('/sm/grooming', (req, res) => {
    res.render('dogtopia_sm/grooming', {
        location: 'Dogtopia San Marcos',
        title: 'Grooming Read'
    });
})

app.get('/sm/owner', (req, res) => {
    res.render('dogtopia_sm/owner', {
        location: 'Dogtopia San Marcos',
        title: 'Owner Read'
    });
})

app.get('/sm/package', (req, res) => {
    res.render('dogtopia_sm/package', {
        location: 'Dogtopia San Marcos',
        title: 'Package Read'
    });
})

app.get('/sm/pet', (req, res) => {
    res.render('dogtopia_sm/pet', {
        location: 'Dogtopia San Marcos',
        title: 'Pet Read'
    });
})

app.get('/sm/report', (req, res) => {
    res.render('dogtopia_sm/report', {
        location: 'Dogtopia San Marcos',
        title: 'Report Read'
    });
})

app.get('/sm/scheduled_service', (req, res) => {
    res.render('dogtopia_sm/scheduled_service', {
        location: 'Dogtopia San Marcos',
        title: 'Scheduled Service Read'
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
    console.log('Server is live');
})