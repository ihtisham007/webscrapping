
const requireSession = (req, res, next) =>{
    if (req.session && req.session.userId) { // check if session exists and has a userId property
        next(); // session exists, continue with the request
      } else {
        res.redirect('/login'); // session doesn't exist, redirect to login page
    }
}

const notRequireSession = (req,res, next) =>{
    console.log(req.session);
    if (!req.session.userId) { // check if session exists and has a userId property
        next(); // session exists, continue with the request
      } else {
        res.redirect('/'); // session doesn't exist, redirect to login page
    }
}

module.exports = {
    requireSession,
    notRequireSession
}