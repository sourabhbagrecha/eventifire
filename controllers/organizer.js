const Event = require('../models/event');
const User = require('../models/user');

exports.getDashboard = async (req, res, next) => {
  try {
    const events = await Event.find({creator: req.user._id});
    return res.render('organizer/dashboard',{
      title: 'Organizer Dashboard', 
      isLoggedIn : req.session.isLoggedIn || false,
      errorMessage: req.flash('error'),
      successMessage: req.flash('success'),
      events: events
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error'});
  }
}

exports.getEventForm = (req, res, next) => {
  return res.render('organizer/event-form',{
    title: 'Create New Event', 
		isLoggedIn : req.session.isLoggedIn || false, 
		user: req.user,
		errorMessage: req.flash('error'),
		successMessage: req.flash('success')
  })
}

exports.postEvent = (req, res, next) => {
  console.log('Request body:',req.body);
  Event.create({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    dateAndTime: req.body.date,
    fees: req.body.fees,
    poster: req.body.poster,
    creator: req.user._id
  })
  .then(results => {
    User.findById(req.user._id)
    .then(user => {
      user.events.push(results._id);
      return user.save()
      .then(saved => {
        return res.redirect('/organizer/')
      })
    })
  })
  .catch(err => console.log(err));
}

exports.getEventEdit = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    return res.render('organizer/event-edit-form', {
      title: 'Edit event', 
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

exports.editEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      dateAndTime: req.body.date,
      fees: req.body.fees,
      poster: req.body.poster
    })
    return res.redirect('/organizer');
  } catch (error) {
    return res.status(500).json({message: 'Something went wrong!'})
  }
}

exports.deleteEvent = async (req, res, next) => {
  try{
    const deleted = await Event.findByIdAndDelete(req.params.id);
    return res.redirect('/organizer');
  } catch (error) {
    return res.status(500).json({message: 'Something went wrong!'})
  }
}