const port=4000;
const express=require('express')
const app=express();
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken")
const multer=require('multer')
const path=require("path")
const cors=require('cors');
app.use(express.json());//it parses the json data which is coming from client and available to req.body.And this is middleware
app.use(cors());
// Database connection 
mongoose.connect("mongodb+srv://pavanponnana1:xo4KqSSJy0bcryNJ@cluster0.mqcppbb.mongodb.net/e-commerce")
app.get("/",(req,res)=>{
res.send("Express app is running")
})
// image storage engine;
const storage=multer.diskStorage({// this function create storage engine and tells where to store the files and how to name them and create file names
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        //Date.now() ->Adds an underscore and the current timestamp to make the filename unique and prevent conflicts.    //
    }
})
const upload=multer({storage:storage})//This line creates a multer middleware instance with the specified storage configuration. The upload variable is now an instance of multer that can be used to handle file uploads in your routes or middleware.
//craeting upload endpoint for image
app.use('/images',express.static('uploads/images'))//express.static is a built-in middleware function in Express. It is used to serve static files, such as images, CSS files, and JavaScript files.
app.post('/upload',upload.single('product'),(req,res)=>{// in the req we get new name of file   // upload.single() is used to process the incoming file request and attach the file information to req body

     res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    }); 
})
const Product=mongoose.model("product",{//here product is name of schema and this is schema
    id:{
        type:Number,
        required:true
    },
    name:{
       type:String,
       required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    new_prices:{
        type:Number,
        required:true

    },
    old_prices:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    avilable:{
        type:Boolean,
        default:true
    }
})
app.post('/addproduct',async(req,res)=>
{// in we are adding product data in the database
    let products=await Product.find({})// it will answer in the form of array  and it will return all the documents in the collection 
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);// it wil return element from the last 
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else
    {
        id=1;
    }
    const product=new Product({// creating a new instance for Product
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_prices:req.body.new_prices,
        old_prices:req.body.old_prices,
    });
    await product.save();//  here our data is save in the mongo db database
    res.json(
        {
        success:true,
        name:req.body.name,
    })
})
//creating api for deleting products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})// it is used to delete particular record  depends up on id 
    console.log('removed');
    res.json({
        success:true,
        name:req.body.name
    })
})
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    res.send(products);
})
const Users=mongoose.model("Users",{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,

    }
})
//creating endpoingt for signup for the user
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({sucess:false,errors:"existing user email "})
    }
      let cart={}
      for (let i = 0; i < 300; i++) 
      {
         cart[i]=0;
      }
      const user=new Users({   //creating instance for users database;
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          cartData:cart
      })
         await user.save();
         const data={
            user:{
                id:user.id
            }
         }
         //here date is payload for the jwt
         const token=jwt.sign(data,'secret_ecom');//The jwt.sign() function is used to generate a JSON Web Token (JWT) based on the data object.
         res.json({success:true,token})//it will return token to the client 

})
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});//in this we have enter record which have user mail
    if(user)
    {
        const passcompare=req.body.password===user.password;//comparing the password
        if(passcompare)
        {
            const data={
                user:{
                    id:user.id
                }
            }
                const token=jwt.sign(data,'secret_ecom');
                res.json({success:true,token});
        }else
        {
            res.json({sucess:false,errors:"wrong password"});
        }
    }else{
        res.json({success:false,errors:'wrong email '})
    }
})
app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection");
    res.send(newcollection)
})
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({});
    let new_data=products.slice(1).slice(-4);
    res.send(new_data);
})
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid"})
    }else{
        try{
             const data=jwt.verify(token,'secret_ecom');// it  is verify our token 
             req.user=data.user;
             next();

        }catch(error){
         res.status(401).send({errors:"please authenticate"})
        }
    }

}
// creating end point for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{

   let userData=await Users.findOne({_id:req.user.id})
 
   userData.cartData[req.body.ItemId]+=1;
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
   console.log(userData)
   res.send("Added")
})
//remove product from cart data
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id})
    if( userData.cartData[req.body.ItemId]>0)
    userData.cartData[req.body.ItemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("removed")
})
//creating end point to getting cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    // console.log(userData.cartData)
    res.json(userData.cartData)
})
app.listen(port,(err)=>{
if(!err){
    console.log("serve running on port" +port);
}else{
    console.log("Error");
}
})
