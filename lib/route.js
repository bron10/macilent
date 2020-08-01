const path = require('path');
const url = require('url');
module.exports = class {
    constructor(routes){
        this.routes = routes;
        this.reqRes;
        // this._listener
    }
    /**
     * 
     * @param {*} req raw request instance
     * @param {*} res raw response instance
     * @param {*} settings app setting
     */
    create(req, res){
        this.reqRes = {req, res};
        const route = this.selectRoute(req);
        if(!route){
            throw new Error('Route not found')
        }
        return this.hit(route);
    }

    selectRoute(req){
        const {pathname} = url.parse(req.url);
        console.log("pathname", pathname);
        return this.getExistingRoute(pathname);
    }

    /**
     * @description check if route exist in configured route
     */
    getExistingRoute(path){
        const selectedRoute = this.routes[path];
        return selectedRoute ? selectedRoute : false;
    }

    hit(route){
        const {req, res}  = this.reqRes;
        return function(){
            route(req, res)
        }
    }
}