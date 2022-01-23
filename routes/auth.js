const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const keys = require('../keys');

const regEmail = require('../emails/registration');
const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Авторизация',
        isLogin: true,
        logError: req.flash('logError')
    });
});

router.get('/register', async (req, res) => {
    res.render('register', {
        title: 'Регистрация',
        isRegister: true,
        regError: req.flash('regError')
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
})


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ email });

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                const user = candidate;
                req.session.user = user;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/');
                })
            } else {
                req.flash('logError', 'Неверный пароль!');
                res.redirect('/auth/login')
            }
        } else {
            req.flash('logError', 'Такого пользователя не существует!');
            res.redirect('/auth/login');
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const {email, password, name, repeat} = req.body;
        
        const candidate = await User.findOne({ email });

        if(candidate) {
            req.flash('regError', 'Пользователь с таким email уже существует!');
            res.redirect('/auth/register');
        } else {
            const hashPass = await bcrypt.hash(password, 10);
            const user = new User({
                email, name, password:hashPass, allContacts: {items:[]}, allNotes: {items:[]}
            });
            await user.save();
            res.redirect('/');
            await transporter.sendMail(regEmail(email, name));
        }

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;