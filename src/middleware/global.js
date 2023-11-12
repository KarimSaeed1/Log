// Features
const catchAsync = require("../services/catchAsync")

// Models
const User = require("../resources/user/model")
const Log = require("../services/log")

// log operations for admin
exports.adminLog = catchAsync(async (req, res, next) => {
    
// get model name 
const match = req.originalUrl.match(/^(?:\/[^\/]+){4}(\/[^?/]+)/);
const model = match[1].slice(1)

// get api action
let action;
switch (req.method){
case "GET":
    action = "show";
    break;

case "POST":
    action = "create";
    break;

case "PUT":
    action = "edit";
    break;

case "DELETE":
    action = "delete";
    break;
}

// get account admin name
let accountAdminName = null;
const accountAdmin = await User.findById(req.user.accountAdmin).select("name");

if(accountAdmin) {
    accountAdminName = accountAdmin.name
}

await Log.create({
userID: req.user.id,
user : req.user.name,
accountAdmin : req.user.accountAdmin,
accountAdminName : accountAdminName,
model : model,
action : action,
data : req.body,
})

next();

});