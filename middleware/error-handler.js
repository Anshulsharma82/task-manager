const { customError } = require('../errors/customError')
const errorHandler = (err,req,res,next) => {
    if(err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    res.status(500).json({err: err})
}

module.exports = errorHandler;