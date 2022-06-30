const express = require('express');

//controller scripts
const controller = require('./controller/control.js');
const profile = require('./controller/profile.js');
const customize = require('./controller/customize.js');
const store = require('./controller/store.js');
const search = require('./controller/searchuser.js');
const modify = require('./controller/account.js');

//session handling scripts 
const { registerValidation, loginValidation } = require('./controller/uservalidation.js');
const usercontroller = require('./controller/usercontroller');
const { isPublic, isPrivate } = require('./controller/check-authentication');

const app = express();

//landing page
app.get('/', isPublic, controller.getIndex);

//game page
app.get('/play', controller.getPlay);

//homepage
app.get('/home', isPrivate, controller.getHome);

//profile page
app.get('/profile', isPrivate, profile.getProfileUser);
app.get('/profile/find', isPrivate, profile.getProfileFind);

//customization page
app.get('/customize', isPrivate, customize.getCustomize);
app.post('/customize/save', customize.postCustomizeSave);

//store page
app.get('/shop', isPrivate, store.getStore);
app.post('/shop/purchase', store.postStorePurchase);

//search user page
app.get('/search', isPrivate, search.getSearch);
app.get('/checkuser', search.getCheckUser);

//account settings page
app.get('/settings', isPrivate, controller.getAccountSettings);
app.get('/delete', isPrivate, modify.getDeleteAccount);
app.get('/change', isPrivate, modify.getChangePassword); 

//login page
app.get('/login', controller.getLogin);
app.get('/login', isPublic, (req, res) => {res.render('login', {pageTitle: 'Login',});});

//register page
app.get('/Register', isPublic, (req, res) => {res.render('register', { pageTitle: 'Registration',});});

//Post methods for form submissions
app.post('/Register', isPublic, registerValidation, usercontroller.registerUser);
app.post('/login', isPublic, loginValidation, usercontroller.loginUser);

//logout
app.get('/logout', isPrivate, usercontroller.logoutUser);

app.all('*', controller.get404);

module.exports = app;