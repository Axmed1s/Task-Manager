const notFound = (req,res) => res.status(404).json({mssg:'route does not exist'})

module.exports = notFound