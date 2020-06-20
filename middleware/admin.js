module.exports = function(req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send({
        error_msg:
          "Acces Denied. You must be an admin to perform this operation."
      });
  next();
};
