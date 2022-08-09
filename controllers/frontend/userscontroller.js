require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var userModel  = require("../../model/user");


// Create User
exports.create = async function(req, res) {
	console.log(req.body);
  try {
    // var User  = userModel(req.params.email) ;
    // Get User input
    const { firstname, lastname, email, password, dob, phone} = req.body;
    // Validate customer input
    if (!(firstname && lastname && email && password && dob && phone )) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if customer already exist
    const ExistEmail = await userModel.findOne({ email });
    if (ExistEmail) {
      return res.status(409).send({"status": false,'message': "Email Already Exist. Please Login"});
    }
    // check if customer already exist
    const ExistPhone = await userModel.findOne({ phone });
    if (ExistPhone) {
      return res.status(409).send({"status": false,'message': "Phone no Already Exist. Please Login"});
    }
    //Encrypt customer password
    encryptedPassword = await bcrypt.hash(password, 10);
    //encryptedPassword = password;
    //const email_verify_token = randomstring.generate(108);
    var customer = await userModel.create({
		firstname,
		lastname,
		email: email.toLowerCase(),
		password: encryptedPassword,
		reset_password_code: 12345,
		dob,
		phone,
		email_verify_token:'Good',
		status: true

    });
    const newData = await userModel.findOne({ email }).lean().exec(); 
    return res.status(201).json({"status": true, 'data': newData, 'message': "Created Successfully"});
  } catch (err) {
    return res.status(500).json({"status": false, 'message': err.message});
  }
};

exports.login = async function(req, res){
  try {
    console.log(req.subdomains);
    const { email, password } = req.body;
    // Validate customer input
    if (!(email && password)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    // check if customer already exist
    var user = await userModel.findOne({ email }).lean().exec();  
    if (!user) {
      return res.status(400).send({"status": false, "message": "Invalid Credentials"});
    }
    if (user && !user.is_verify && user.role != SUPERADMIN) {
       return res.status(400).send({"status": false, "message": "Please verify Your account first"});
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      var user_id = user._id;
      if(user.role == 'STAFF'){
           user_id = user.createdBy;
      }
      const token = jwt.sign(
        {_id: user._id, user_id: user_id, email , role: user.role ,isSuperAdmin: (user.role == SUPERADMIN) ? true : false},
           process.env.TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );
      // save user token
      user.token = token;
      delete user.password;
      // cutomer
      return res.status(200).json({"status": true, "data": user});
    }
    return res.status(400).send({"status": false, "message": "Invalid Credentials"});
  } catch (err) {
    return res.status(500).json({"status": false, 'message': "Something went wrong"});
  }
};