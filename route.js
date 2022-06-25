const express = require('express');
const controller = require('./controller/control.js');

const app = express();

//page redirects
app.get('/', controller.getIndex);
app.get('/play', controller.getPlay);
app.get('/home', controller.getHome);
app.get('/profile', controller.getProfile);
app.get('/customize', controller.getCustomize);
app.get('/shop', controller.getStore);
app.get('/search', controller.getUserSearch);

//data requests
app.post('/shop/purchase', controller.postStorePurchase);
app.post('/customize/save', controller.postCustomizeSave);
app.get('/checkuser', controller.getCheckUser);

module.exports = app;