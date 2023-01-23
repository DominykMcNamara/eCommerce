const errorHandler = (err, req, res, next) => {
    const { message, status } = err
    return res.status(status).send({ message })
}

module.exports = errorHandler