const unmatchedRoutes = (req,res,next) => {
    console.log("unMatchedRoutes")
    res.status(404).json({success: false, msg: 'Oops! Invalid Route'})
}

module.exports = unmatchedRoutes