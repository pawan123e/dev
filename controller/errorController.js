const AppError = require('../utils/AppError')

const devError = (err, res) =>{
  if(err.isEditable){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
}) }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

const duplicateData = () =>{
   return new AppError('User already exists', 409);
}

const castError = () => {
  return new AppError('Invalid Id', 400);
}

const validationError = err =>{
  const messageStack = Object.values(err.errors).map(el => el.message);
  const message = messageStack.toString().split(',').join('. ');
  return new AppError(message, 400);
}

const prodError = (err, res) =>{
    if(err.isEditable){
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
  }) 
    }  else {
       res.status(err.statusCode).json({
            status: err.status,
            message: "Something went wrong",
            err
      }) 
   }    
}

const errorControl = (err, req, res, next) =>{
  
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error'
          
      if(process.env.NODE_ENV === 'development'){
        let error = {...err}
        error.message = err.message;
        if(error.name === 'CastError') error = castError();
          devError(error, res);
          
      }

      else if(process.env.NODE_ENV === 'production'){
          let error = {...err}
          error.message = err.message;
          if(error.code === 11000) error = duplicateData(error);
          if(error.name === 'ValidationError') error = validationError(error);
          if(error.name === 'CastError') error = castError();
          prodError(error, res)  
}
}
module.exports = errorControl;