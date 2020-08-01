const Server = require('./server');
const Route = require('./route');
module.exports = function (options) {
    return new Server(options);
    
};