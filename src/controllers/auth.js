const auth = require('./../services/auth');

module.exports.setLogin = async (req, res) => {
  try {
    const data = await auth.setLogin(req.body);
    res.send(data);
  }
  catch (error) {
    res.send( {
      "success": false,
      "message": error
      }
    );
  }
}