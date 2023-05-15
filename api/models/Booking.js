const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cars'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    start: {type: Date, required: true},
    stop: {type: Date, required: true},
    fullname: {type: String, required: true},
    phone: {type: String, required: true},
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;