
const notFoundRoute = (req,res)=>{
    res.status(404).send("<h3>Route Not Found.</h3>");
}

module.exports = notFoundRoute;