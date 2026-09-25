// app.post('/signup' ,async(req ,res)=>{
//       const {username , email, password}= req.body
//     if(!username || !email || !password){
// res.status(400).send({message :"All field Required"})
// return;
//     }
//         try {
  
//         const emailcheck =  await db.query(`SELECT * FROM users WHERE email = $1 `,[email])

//         if(emailcheck.rows.length > 0){
//             res.status(400).send({message:"This Email Already Exists"});
//             return;
//         }


//         const passwordhash = await bcrypt.hash(password ,10)

//         const result = await db.query(`INSERT INTO users(username , email,password)
//             values($1,$2 ,$3)
//             RETURNING id , username ,email`,
//         [username,email,passwordhash])

//         res.status(201).send({message :"Signup Successfully", user : result.rows[0]})
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({status :"error" , message:"Internal Server Error"})
//     }
// })

// app.post("/login" ,async(req ,res)=>{
//     try {
//         const {email,password}=req.body;
// const emailcompare = await db.query(`SELECT * FROM users WHERE email = $1`,[email])
// if(emailcompare.rows.length === 0){
//     res.status(400).send({status :"error",message:"Invalid email or Pasword"})
//     return;
// }

// const User = emailcompare.rows[0]

// const passwordcompare = await bcrypt.compare(password,User.password)
// if(!passwordcompare){
//     res.status(400).send({Status:"error" , message :"Invalid Email and Password"})
//     return;
// }

// res.status(201).send({Status:"Success" , message:"Login Successfully" , User :{
//     id : User.id,
//     username:User.username,
//     email:User.email
// }})

//     } catch (error) {
//         console.log(error)

//         res.status(500).send({Status:"error",message:"Internal Server error"})
//     }
// })