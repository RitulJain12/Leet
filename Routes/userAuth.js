const express=require('express');
const Router=express.Router();
const {Reguser,Loguser, LogOutUser,getUser,Regadmin,DeletePro}=require('../Controlers/Usercontroler');
const {UserLogout,UserPro}=require('../MiddleWare/userMiddleware')
const {adminAuth}=require('../MiddleWare/AdminReg');
Router.post('/register',Reguser);
Router.post('/login', Loguser);
 Router.get('/logout',UserLogout,LogOutUser);
 Router.get('/getProfile',UserPro,getUser);
Router.post('/adminregister',adminAuth,Regadmin)
Router.delete('/deleteprofile',UserPro,DeletePro)
module.exports=Router;