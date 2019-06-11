import jsend from 'jsend'

export const queryHandler = () => (err, req, res, next) => {
  if (req.querymen && req.querymen.error) {
    return res.status(400)
      .json(jsend.fail({ ...req.querymen.error }))
  }
  next(err)
}

export const bodyHandler = () => (err, req, res, next) => {
  if (req.bodymen && req.bodymen.error) {
    return res.status(400)
      .json(jsend.fail({ ...req.bodymen.error }))
  }
  next(err)
}

export const mongoHandler = () => (err, req, res, next) => {
  if (err.name === 'MongoError') {
    return res.status(409)
      .json(jsend.fail(err))
  }
  next(err)
}

export const errorHandler = () => (err, req, res, next) => {
  if (err.name === 'SyntaxError') {
    res.status(400)
      .json(jsend.error(err))
  } else if (err.name === 'ValidationError') {
    res.status(400)
      .json(jsend.fail(err))
  } else {
    res.status(500)
      .json(jsend.error(err))
    next(err)
  }
}
