var messages = require('./messages');
var Hbars               = require('handlebars');

/**
function ResponseHandler() {
    this.handle = function (req, res, next) {

        var bindObj = {res: res};
        res.okSend = responses.ok.bind(bindObj); 
        res.setError = responses.setError.bind(bindObj);   
        
        if(req.path.length==1){
            return res.setError({
                path : req.url,
                type : 'notFound',
                method: req.method
            }, 'route');
        }
        next(); //call next middleware
    }
}
module.exports = new ResponseHandler();
**/


function ResponseCreater() {
    var self = this;

    self.setResponse = function(){
        console.log("set got called");
    }

    self.setSuccess = function(data, path){
        //console.log("data 1", data);
        var type = 'ok';
        var status = messages[type].status_code;
        //console.log("response Data", messages[type], path);
        var responseData = _.cloneDeep(_.get(messages[type], path, {}));
        var embeddedData = data.dataToInsert;
        if(embeddedData){
            responseData.message = Hbars.compile(responseData.message)(embeddedData);
            delete responseData.dataToInsert;
        }
        
        try{
            data = JSON.parse(data);
            responseData =_.assign(responseData, data, {});
        }catch(e){
            responseData.data = data;		
        }

        //console.log("data 2", responseData)
       if(!responseData.status_code){
           responseData['status_code'] = status;
       } 
       //console.log("in response ok--->", self);
       return this.res.status(status).send(responseData);    
    },
    
    self.setError = function(errDetails, path){
       // console.log("Error details path", errDetails, path);
       var errDetails = errDetails || {};
        
        /**
         * Type can be 
         *  ok                  
            forbidden           
            notFound            
            serverError         
            unprocessableEntity 
            preconditionFailed  
            largeEntity         
         */
        var type            = errDetails.type || 'serverError';
        var errorCode       = messages[type].status_code;
        var responseData    = _.cloneDeep(_.get(messages[type], path, {}));
        

        var embeddedData = errDetails.dataToInsert;
        if(embeddedData){
            console.log("embedding data", embeddedData, responseData.message);
            responseData.message = Hbars.compile(responseData.message)(embeddedData);
            delete errDetails.dataToInsert;
        }
        if (errDetails.key) {
            responseData.message += ": " + errDetails.key
        }
        try{
            errDetails = JSON.parse(errDetails);
            responseData =_.assign(responseData, errDetails, {});
        }catch(e){
            responseData.error = errDetails;		
        }
        if(!responseData.status_code){
           responseData['status_code'] = errorCode;
        } 
        //console.log("in response error--->");
        return this.res.status(errorCode).send(responseData);
    },

    /**
     * @param type type of messages
     * @param path path of messages
    */
    self.getMessages = function(path, type){
        type = type || 'ok';
        return _.cloneDeep(_.get(messages[type], path, {}));
    }

};


module.exports                   = new ResponseCreater();
// module.exports.unprocessableEntity  = new ResponseCreater('unprocessableEntity').create;
// module.exports.serverError          = new ResponseCreater('serverError').create;
// module.exports.notFound             = new ResponseCreater('notFound').create;
// module.exports.forbidden            = new ResponseCreater('forbidden').create;
//module.exports.setError             = responseInstance.setError;