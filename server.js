import cors from 'cors'
import db from './db.js'
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path"


dotenv.config();

const SECRET = process.env.JWT_SECRET;
const app = express()
const PORT = 5000;
// const SECRET = process.env.JWT_SECRET

console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

app.use(express.json());
app.use(
  cors({
    origin:[ "http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());


// app.get("/",(req,res)=>{
//     res.send({message:"Hello I'm Developer umar ahmed"})
// })






app.post("/api/v1/signup" , async(req,res)=>{
    const reqbody= req.body

    if(!reqbody.first_name ||!reqbody.last_name || !reqbody.email || !reqbody.password){
        res.status(401).send({status :"error", message :"Required Parameter is Missing"})
        return;
    }
    try {
        const salt = await bcrypt.genSalt(12)
        const passwordhash = await bcrypt.hash(reqbody.password, salt)



        const dbquery = reqbody.isSeller ?
        `INSERT INTO users (first_name,last_name,email, password, phone ,role ) VALUES($1,$2,$3,$4,$5,$6)`:
        `INSERT INTO users (first_name , last_name ,email, password, phone ) VALUES($1,$2,$3,$4,$5)`;

        const dbValues = reqbody.isSeller ?
        [reqbody.first_name ,reqbody.last_name,reqbody.email,passwordhash , reqbody.phone || "", 'seller']:
        [reqbody.first_name ,reqbody.last_name,reqbody.email,passwordhash , reqbody.phone || ""]

        const dbreq = await db.query(dbquery,dbValues)

        res.status(201).send({Status :"Success" , message :`Users create with Email ${reqbody.email}`})
        
        } catch (error) {
            console.log(error)

            if(error.code == '23505'){
                res.status(400).send({status:"error",message :"Users Already Logined With This Email"})
            }else{
                res.status(500).send({status:"error",message :"Internal Server Error"})

            }
        
    }
})

app.post("/api/v1/login", async (req, res) => {

    const reqbody = req.body;

    if (!reqbody.email || !reqbody.password) {
        return res.status(400).send({
            status: "error",
            message: "Required Parameter Missing"
        });
    }

    try {

     const users = await db.query(`SELECT * FROM users WHERE email = $1 AND in_active = true`, [reqbody.email]
);
console.log("USER FROM DATABASE" , users.rows)
        const currentuser = users.rows[0];

        if (!currentuser) {
            return res.status(400).send({status: "error", message: "User Not Found With This Email and Password"});}

     

console.log("Plain Password:", password);
console.log("DB Password Hash:", currentuser.password_hash || currentuser.password);

const isPasswordValid = await bcrypt.compare(password, currentuser.password_hash || currentuser.password);
        if (!isPasswordValid) {

            return res.status(400).send({status: "error",message: "User Not Found With This Email And Password"});}
        const usertoken = jwt.sign(
            {
                id: currentuser.id,
                email: currentuser.email,
                first_name: currentuser.first_name,
                last_name: currentuser.last_name,
                role: currentuser.role
            },
            SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("Token", usertoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).send({
          message: "Login successful",
  users: {
    id: users.id,
    email: users.email,
  }
        });

    } catch (error) {

        return res.status(500).send({ status: "error",
            message: "Internal Server Error"
        });
    }
});


app.get('/api/v1/me' ,(req ,res)=>{
   if(!req?.cookies?.Token){
    res.status(401).send({message:"Unauthorized"})
   return;

   }

   jwt.verify(req.cookies.Token, SECRET ,(err,decodedData)=>{
    if(!err){
        const nowDate = new Date().getTime() / 1000;
        if(decodedData.exp < nowDate){
res.status(401);
res.cookie('Token' , '', {
    maxAge:1,
    httpOnly:true,
    secure:false,
    sameSite: "lax"
});
res.send({message:"Token Expired"})
        }else{
            let userData = decodedData
            delete userData.iat
            delete userData.exp
            res.status(200).send({status: "success" , user :userData})
        }

    }
    else{
        res.status(401).send({message:"Invalid Token"})
    }
   })
})


const __dirname = path.resolve();
const __frontend = path.join(__dirname, './catalyst_analytics/build')
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT ,(req ,res)=>{
    console.log(`app is running is ${PORT}`)
}) 