const Http = require('http');
const Https = require('https');
const Route = require('./route');
module.exports = class {
    constructor(options){
        this._Route = new Route(options.routes);
        this.port   = options.port;
         
        this._listener
    }

    /**
     * 
     * @param {Object} settings tls setting 
     * @description starts createServer
     */
    start(settings){
        this.checkSetting(settings)
        const serverInstance = this.creatServer(settings);
        serverInstance.on('request', (req, res) => {
            
            const Request = this._Route.create(req, res);
            Request();
        })
        return this._listener;
    }

    /**
     * @description validate to default settings
     */
    checkSetting(settings){
        return settings;
    }

    creatServer(settings){
        this._listener = Http.createServer();
        this._listener.listen(this.port);
        return this._listener;
    }

}