class ExpressError extends Error{
    
    constructor(status, massage){
        super();
        this.status = status;
        this.message = massage;
    }
}

module.exports = ExpressError;