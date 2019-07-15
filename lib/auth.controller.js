

exports.twitter = (req, res) => {
  const io = req.app.get('io')
  
  const user = { 
    data: req.user
  }

  io.in(req.session.socketId).emit('twitter', user)
  res.end()
}

