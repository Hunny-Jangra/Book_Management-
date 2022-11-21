const UserModel = require('../Models/userModels');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SEC_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.createUser = async (req, res) => {
    try{

        let data = req.body;
        let {title, name, phone, email, password, address} = data;
        
        if(Object.keys(data).length == 0) {
            return res.status(400).send({
                status:false,
                message: "Data is Required to add a User"
            })
        }
    
        if(!title){
            return res.status(400).send({
                status: false,
                message: "Title is required"
            })
        }
        
        if(!name) {
            return res.status(400).send({
                status: false,
                message: "name is required"
            })
        }
    
        if(!phone){return res.status(400).send({status: false, message: "Phone is required"})};
        
        if(!email){
            return res.status(400).send({status: false,message: "Email is required"})
        }
        if(!password){
            return res.status(400).send({status: false,message: "Password is required"})
        }
        if(!address){return res.status(400).send({status: false,message: "Address is required"})
        }
    
        const useralreaduExists = await UserModel.findOne({name: name});
        if(useralreaduExists){
            return res.status(400).send({
                status: false,
                message: "This User is Already Exists in Database"
                })
            }
            
            const createUser = await UserModel.create(data);
            
            
            return res.status(201).send({
                status: true,
                message: 'Success',
                data: {
                    createUser
                }
                
            })
        
    }catch(error){ 
        res.status(400).send({
            status: false,
            message: error.message
        })


    }

}

exports.loginUser = async(req, res) => {
    try{

        let data = req.body;
        let {email, password} = data;
    
        // 1) Check if email and password is present or not
        if(!email){
            res.status(400).send({
                status:false,
                message:"Please provide Email or Username"
            })
        }else if(!password){
            res.status(400).send({
                status:false,
                message:"Please provide valid Password"
            })
        }
    
        // 2) Check if email is exsit is database and password is correct or not
        const userInDB = await UserModel.findOne({email, password});
        if(!userInDB) {
            res.status(400).send({
                status: false,
                message: "Please provide a Valid email and Password"
            })
        }
        // 3) if everything is ok then pass Token to the Client
        else{
            const token = signToken(userInDB._id);
            res.status(200).send({
                status: true,
                data:{
                    token
                }
            })
        }
    }catch(error) {
        res.status(401).send({
            status: false,
            message: error.message
        })
    }
}

exports.protectingMID = async(req, res, next) => {
    // 1) Getting Token and check Toekn is there or not 
    try{

        let token;
        if(req.headers["x-api-key"] && req.headers["x-api-key"].startsWith('Bearer')){
            token = req.headers["x-api-key"].split(' ')[1];
        }
        if(!token) {
            res.status(400).send({
                status: 'Failed',
                message: 'Please logged in to get access'
            })
        }
    
        // 2) verification Process
        const decoded = await jwt.verify(token, process.env.JWT_SEC_KEY);
        console.log(decoded);
    
        // 3)Check if user still exists or not
        const checkUSerExists = await UserModel.findById(decoded.id);
        if(!checkUSerExists) {
            res.status(401).send({
                status: 'invalid user',
                msg: 'User blonging to this token is no longer exist'
            })
        }
        next();
    }catch(error) {
        res.status(403).send({
            status: 'invalid signature',
            msg: error.message
        })
    }
}
