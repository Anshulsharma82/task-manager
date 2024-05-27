const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next)
        } catch (err) {
            console.log("erroo in async wraper: ", err)
            next(err)
        }
    }
}

module.exports = asyncWrapper