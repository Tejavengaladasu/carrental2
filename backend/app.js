import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { model } from "mongoose";
import regi from "./modals/regi.js";
import book from "./modals/book.js";
import complaint from "./modals/complaint.js";
import nodemailer from 'nodemailer';
import otpverify from "./modals/otpverify.js";
import multer from "multer";
import addingteam from "./modals/addingteam.js";
import addingmodel from "./modals/addingmodel.js";
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
app.use('/images',express.static('public/images'))
mongoose.connect('mongodb+srv://suryateja:3Wik3yNs3T36rggY@carrental.h2dvwrw.mongodb.net/carrental?retryWrites=true&w=majority')
.then(()=>app.listen(9121))
.then(
    console.log("hello teja")
)
.catch((err)=>console.log(err))
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/images/')
    },
    filename: function (req, file, callback) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      callback(null, Date.now()+"_"+file.originalname)
    }
  })

const upload = multer({ storage: storage })
app.post("/createuser",(req,res,next)=>{
    const {name,email,password}=req.body.formdata;
    let stud=new regi({
        name,
        email,
        password
    })
    stud.save()
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'suryaexpo33@gmail.com',
            pass: 'obfp jbea qqiv rbqx'
        }
        });
    
        var mailOptions = {
        from: 'suryaexpo33@gmail.com',
        to: email,
        subject: 'Welcome to Car Rental',
        // text: 'Hello '+username,
        text:`Hello ${name} ,we are happy to have a customer like you.`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    return res.status(200).json({msg:"Successfull"})
})

//login code
app.post("/getuser",async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const logdata=await regi.findOne({email:email})
        if(!logdata){
            return res.status(200).json({msg:"user not found"})
        }
        else{
            if(logdata.password==req.body.password){
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'suryaexpo33@gmail.com',
                        pass: 'obfp jbea qqiv rbqx'
                    }
                    });
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    const date = new Date();
                    const showhour = date.getHours() 
                        // + ':' + (date.getMinutes() +2)
                        // + ":" + date.getSeconds();
                    const showmin=(date.getMinutes()+2);
                    let status="0";
                    let voter=new otpverify({
                        email,
                        otp,
                        showhour,
                        showmin,
                        status
                    })
                    try{
                        voter.save()
                    }
                    catch(err){
                        console.log(err)
                    }
                    var mailOptions = {
                    from: 'suryaexpo33@gmail.com',
                    to: email,
                    subject: '!Important',
                    // text: 'Hello '+username,
                    // text:`Hello Your account in car rental has been loged ,if its not you please inform or contact us.`,
                    text:`Your otp is ${otp},Use it before 2 minutes after it expires`
                    };
                
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                return res.status(200).json({msg:"login successfull"})
            }
            else{
                return res.status(200).json({msg:"Incorrect Password"})
            }
        }
    }
    catch(err){
        console.log(err)
    }
})

app.post("/bookcar",async(req,res,next)=>{
    const {name,email,adhar,licence,phone,car}=req.body.bookdata;
    let stud =new book({
        name,
        email,
        adhar,
        licence,
        phone,
        car
    })
    stud.save()
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'suryaexpo33@gmail.com',
            pass: 'obfp jbea qqiv rbqx'
        }
        });
    
        var mailOptions = {
        from: 'suryaexpo33@gmail.com',
        to: email,
        subject: 'Welcome to Car Rental',
        // text: 'Hello '+username,
        text:`Hello ${name},On this number ${phone} the car ${car} booked with the email ${email}.If it's not you please report back,
        further details please contact +91 99999 44444`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    return res.status(200).json({msg:"booked successfully"})    
})

//for getting querys

app.post("/querys",async(req,res,next)=>{
    const {name,email,query}=req.body.con;
    let stud=new complaint({
        name,
        email,
        query
    })
    stud.save()
    return res.status(200).json({msg:"Your request sent"})
})


//for adding member

app.post('/addteam',upload.single("myfile"),async(req,res,next)=>{
    //res.send(message:"sucess")
    // res.send(req.body)
    console.log(req.body);
    const mempics=(req.file)? req.file.filename:null
    // res.send("success")
    const {name,position,}=req.body
    const stud=new addingteam({
        name,
        position,
        mempics
    })
    // stud.save()
    try{
        // alert("success")
        stud.save()
    }
    catch(err){
        console.log(err)
    }
    return res.status(200).json({msg:"success"})
})

// for showing team

app.get('/getTeam',async(req,res)=>{
    let teamsdata
    try{
        teamsdata=await addingteam.find()
    }
    catch(err){
        console.log(err)
    }
    if(!teamsdata){
        console.log("no student data")
    }
    return res.status(201).json(teamsdata)
})

//for addind car model

app.post('/addmodel',upload.single("myfile"),async(req,res,next)=>{
    //res.send(message:"sucess")
    // res.send(req.body)
    console.log(req.body);
    const carimgs=(req.file)? req.file.filename:null
    // res.send("success")
    const {name,model,transmission,variant,rating,price}=req.body
    const stud=new addingmodel({
        name,
        model,
        transmission,
        variant,
        rating,
        price,
        carimgs
    })
    // stud.save()
    try{
        // alert("success")
        stud.save()
    }
    catch(err){
        console.log(err)
    }
    return res.status(200).json({msg:"success"})
})

// for getting model

app.get('/getmodel',async(req,res)=>{
    let cardata
    try{
        cardata=await addingmodel.find()
    }
    catch(err){
        console.log(err)
    }
    if(!cardata){
        console.log("no student data")
    }
    return res.status(200).json(cardata)
})

//for otp verification

app.post("/getotp",async(req,res,next)=>{
    const {otp}=req.body;
    console.log(otp)
    try{
        let date=new Date()
        const otpdata=await otpverify.find({otp:otp})
        console.log(otpdata)
        if(!otpdata){
            return res.status(200).json({msg:"Entered otp is wrong"})
        }
        else{
            if(otpdata.status=='0'){
                if(otpdata.showhour==date.getHours()){
                    if(otpdata.showmin<=date.getMinutes()){
                        otpverify.updateOne({otp:otp},{$set:{"status":"1"}})
                        return res.status(200).json({msg:"Otp verified"})
                    }
                }
                else{
                    return res.status(200).json({msg:" otp is Expired"})
                }
            }
        }
    }
    catch(err){
        console.log(err)
    }
})