const responses = require('responses');
module.exports = (req, res)=>{
res.set = responses.set;
}