const express = require('express');

//controller scripts
const controller = require('./controller/control.js');
const profile = require('./controller/profile.js');
const customize = require('./controller/customize.js');
const store = require('./controller/store.js');
const search = require('./controller/searchuser.js');
const modify = require('./controller/account.js');
const gm = require('./controller/gameController.js');

//session handling scripts 
const { registerValidation, loginValidation } = require('./controller/uservalidation.js');
const usercontroller = require('./controller/usercontroller');
const { isPublic, isPrivate } = require('./controller/check-authentication');

const app = express();

//landing page
app.get('/', isPublic, controller.getIndex);

//game page
app.get('/play', gm.getGame);
app.post('/game/win', gm.gamewin);
app.post('/game/lose', gm.gameloss);
app.get('/game/guess', gm.getGuess);
app.get('/game/answer', gm.getAnswer);
app.get('/game/played', gm.getPlayed);
app.post('/game/upload',gm.uploadAnswer);


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
app.post('/delete', isPrivate, modify.getDeleteAccount);
app.post('/change', isPrivate, modify.getChangePassword); 

//login page
app.get('/login',  isPublic, controller.getLogin);

//register page
app.get('/Register', isPublic, controller.getRegister);

//Post methods for form submissions
app.post('/Register', registerValidation, usercontroller.registerUser);
app.post('/login', loginValidation, usercontroller.loginUser);

//logout
app.get('/logout', isPrivate, usercontroller.logoutUser);

//404 page
app.all('*', controller.get404);

module.exports = app;
