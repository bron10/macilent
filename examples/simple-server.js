const macilent = require('../lib');
// console.log("macilent", macilent);
const routeCallback = function(req, res){
    res.end('hello')
}
const routes = {
    '/call/him' : routeCallback
}

/**
 * Configure an app
 */
const app = macilent({
    port : 4200,
    routes 
});

/**
 * Start an app
 */
app.start();

// module.exports = app;
// app.route('/call/me', routeCallback)