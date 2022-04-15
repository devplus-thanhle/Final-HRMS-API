exports.errorHandle = (err, req, res, next) => {
  err.status = err.status || 500;

  if (err.message === "jwt expired") {
    err.status = 401;
    err.message = "Token expired";
  }
  if (err.message === "jwt malformed") {
    err.status = 401;
    err.message = "Malformed Token";
  }
  if (err.message === "invalid token") {
    err.status = 401;
    err.message = "Invalid Token";
  }

  //   //Dupicate key error
  //   if (err.code === 11000) {
  //     err.status = 400;
  //     for (let p in err.keyValue) {
  //       err.message = `${p} have to be uique`;
  //     }
  //   }

  //   //ObjectId: not found
  //   if (err.kind == "ObjectId") {
  //     err.status = 404;
  //     err.message = `Id not found`;
  //   }

  return res.status(err.status).json({ msg: err.message });
};
