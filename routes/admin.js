var express = require('express');
var router = express.Router();

var key=require('../Admin/key');
Class = require('../models/class');

router.get('/login',function(req,res,next){
	res.render("admin/login");
})

router.post('/register',function(req,res,next){
   var username=req.body.username;
   var password=req.body.password;
   if((username==key.Admin.username)&&(password==key.Admin.password)){
    res.render("admin/index",{admin:true});

   }else{
        res.redirect('/')
   }

})


router.get('/addClass',function(req,res,next){
  res.render('admin/addClass',{admin:true});

})


router.post('/classes/register', function(req, res){
	info = [];
	//info['instructor_username'] = req.user.username;
	info['class_description'] = req.body.class_description;
	info['class_title'] = req.body.class_title;
   
    console.log("info");
    console.log(info);
	Class.addClass(info, function(err,classes){
		if(err) throw err;
		console.log(classes);
	});

	req.flash('success_msg', 'New class is being added by Admin');
	res.redirect('/');
});



router.get('/logout',function(req,res,next){
	res.redirect('/')
})


module.exports=router;