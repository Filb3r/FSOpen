const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.log(...params)

    next(error)
}

module.exports = {
    info, error
}