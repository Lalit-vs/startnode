const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      firstname: { type: String, default: null },
      lastname: { type: String, default: null },
      email: { type: String, unique: true },
      password: { type: String },
      reset_password_code: { type: String , default: null},
      reset_password_token: { type: String , default: null},
      token: { type: String,default: null },
      dob: { type: Date, default: null },
      phone: { type: String, unique: true },
      pictures: { type: String, default: null },
      is_verify: { type: Boolean, default: false },
      phone_verify: { type: Boolean, default: false },
      email_verify_at:{type: Date,default: null},
      email_verify_token:{type:String,default: null},
      email_token_time:{type:Date,default: null},
      last_login_ip:{type:String,default: null},
      verificationAppliedAt:{type:Date,default:null},
      verfiedAt: {type:Date,default:null},
      status: {type: Boolean,default: true},
      deactivateReasion: {type: String, default: null}
    }, {timestamps:true});

module.exports = mongoose.model("users", userSchema);