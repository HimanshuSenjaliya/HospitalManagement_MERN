import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required : true ,
        minLength : [3,"First Name Must be Atleast 3 Character!😒"]
    },
    lastName : {
        type : String ,
        required : true ,
        minLength : [3,"Last Name Must be Atleast 3 Character!😒"]
    },
    email : {
        type : String ,
        required : true ,
        validate : [validator.isEmail , "Please Provide a Valid Email!🤬"]
    },
    phone : {
        type : String ,
        required : true ,
        minLength : [10 , "Phone Number must contain Exact 10 Digits!😊"],
        maxLength : [10 , "Phone Number must contain Exact 10 Digits!😊"]
    },
    message : {
        type : String ,
        required : true ,
        minLength : [10 , "Message Must contain Atleast 10 Character!😊"]
    }
})

export const Message = mongoose.model("Message" , messageSchema)