const Event = require('../models/event');

exports.getHome = async (req, res, next) => {
  try {
    const events = await Event.find({}).populate('creator');
    return res.render('main/home',{
      title: 'Home', 
      isLoggedIn : req.session.isLoggedIn || false, 
      user: req.user,
      events: events,
      errorMessage: req.flash('error'),
      successMessage: req.flash('success') 
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error'});    
  }
}

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator');
    return res.render('main/event',{
      title: event.name, 
      isLoggedIn : req.session.isLoggedIn || false, 
      user: req.user,
      event: event,
      errorMessage: req.flash('error'),
      successMessage: req.flash('success') 
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error'});    
  }
}