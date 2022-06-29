const express = require('express');

//controller scripts
const controller = require('./controller/control.js');
const customize = require('./controller/customize.js');
const store = require('./controller/store.js');
const search = require('./controller/searchuser.js');

//session handling scripts 
const { registerValidation, loginValidation } = require('./controller/uservalidation.js');
const usercontroller = require('./controller/usercontroller');
const { isPublic, isPrivate } = require('./controller/check-authentication');

const app = express();

//landing page
app.get('/', controller.getIndex);

//game page
app.get('/play', controller.getPlay);

//homepage
app.get('/home', controller.getHome);

//profile page
app.get('/profile', controller.getProfile);

//customization page
app.get('/customize', customize.getCustomize);
app.post('/customize/save', customize.postCustomizeSave);

//store page
app.get('/shop', store.getStore);
app.post('/shop/purchase', store.postStorePurchase);

//search user page
app.get('/search', search.getUserSearch);
app.get('/checkuser', search.getCheckUser);

//account settings page
app.get('/settings', controller.getAccountSettings);

//login page
app.get('login', controller.getLogin);
app.get('/login', isPublic, (req, res) => {res.render('login', {pageTitle: 'Login',});});

//register page
app.get('/Register', isPublic, (req, res) => {res.render('register', { pageTitle: 'Registration',});});

//Post methods for form submissions
app.post('/Register', isPublic, registerValidation, usercontroller.registerUser);
app.post('/login', isPublic, loginValidation, usercontroller.loginUser);

//logout
app.get('/logout', isPrivate, usercontroller.logoutUser);

module.exports = app;