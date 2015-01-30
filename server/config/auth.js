// this is not used anywhere yet but the idea is that
// this will be middleware to prevent access to performing
// operations on the certain resources that arent owned
// by the user
exports.modifiableOnlyByOwner = function(req, res, next) {
  /**
   * if the authenticated users ID doesn't match
   * the found user's ID they shouldn't be able to modify
   * this resource.  send a 403 otherwise continue
   *
   * strange behavior: the req.foundUser's _id is not a string
   * but the req.user's (deserialized from express-jwt) id is a string.
   * workaround: make sure both _id's are actually strings.
   */
  if (req.user._id !== (req.foundUser._id + '')) {
    return res.status(401).json({
      message: 'Not Authorized'
    });
  } else {
    return next();
  }
};

