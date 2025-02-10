
const errorWrapper =(controller)=>{
    
    return async (req,res,next)=>{
        try {
            await controller(req,res,next);
        } catch (error) {
            res.status(error.status || 500).send({Error:error.message} ||"Server Error, Please try again later.");
        }
    }
}

module.exports = errorWrapper;