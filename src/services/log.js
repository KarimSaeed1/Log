// Libraries
const mongoose = require("mongoose");

// Classess
const API = require("./apiHandler")

// Objects
const apiHandler = new API()

// Log model
const logSchema = new mongoose.Schema(
  {
    
    userID : mongoose.Schema.ObjectId,

    user : String,

    accountAdmin : mongoose.Schema.ObjectId,
      
    accountAdminName :String,
      
    model : String,

    action : String,
      
    data : Object,

    type : {
      type : String,
      enum : [""],
    } ,
    
    forAdmin : {
      type : Boolean,
      default : true,
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
const Log = mongoose.model("Log", logSchema);


//GET
exports.getAllLogs = catchAsync(async (req, res, next) => {

apiHandler.getAll(Log,{accountAdmin: req.user.id,model: req.query.model,forAdmin : true});

});

exports.searchUserName = catchAsync(async (req, res, next) => {
    
apiHandler.getAll(Log,{accountAdmin : req.user.id,forAdmin : true},{key : "user" , value : req.query.name})
    
});

//DELETE
exports.deleteLog = catchAsync(async (req, res, next) => {

apiHandler.delete(Log);
    
});

exports.deleteLogs = catchAsync(async (req, res, next) => {
    
apiHandler.deleteMany(Log);

});


module.exports = Log;