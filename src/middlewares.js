const {isUuid} = require('uuidv4')
module.exports = {
  isValidId(req, res, next) {
    const {id} = req.params
    if (!isUuid(id)) {
      return res.status(400).json({error: 'Invalid ID'})
    }
    return next()
  },
}
