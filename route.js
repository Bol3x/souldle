const express = require('express');

//controller scripts
const controller = require('./controller/control.js');
const customize = require('./controller/customize.js');
const store = require('./controller/store.js');
const search = require('./controller/searchuser.js');

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

module.exports = app;