function errorHandler(err, req, res, next) {
    // console.log("req",req);
 
    // res.status(err.status || 500).json({
    //     message: err.message || 'Internal Server Error',
    //     stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    // });
}

export default errorHandler