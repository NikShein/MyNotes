const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const { truncate, dateTransform } = require('./modules/helpers');
const csurf = require('csurf');
const flash = require('connect-flash');


const home = require('./routes/home');
const notes = require('./routes/notes');
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');
const error = require('./routes/error');
const keys = require('./keys');

const User = require('./models/user');



const PORT = 3000;
const app = express();

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const req = require('express/lib/request');
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        truncate,
        dateTransform
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(csurf());
app.use(flash());

app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', home);
app.use('/notes', notes);
app.use('/notes/id', notes);
app.use('/contacts', contacts);
app.use('/contact', contacts);
app.use('/auth', auth);
app.use('/error', error);



async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});
        app.listen(PORT, () => {
            console.log('Server ----------------------------- OK');
        })
    } catch (error) {
        console.log(error);
    }
}

start()