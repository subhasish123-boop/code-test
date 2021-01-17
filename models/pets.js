const mongoose = require('mongoose');
const deleted = [true, false];
const PetSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    colour:{ type: String, required: true },
    isDeleted: { type: Boolean, default: false, enum: deleted },
},{timestamps:true},{versionKey: false});

module.exports = mongoose.model('Pets', PetSchema);
