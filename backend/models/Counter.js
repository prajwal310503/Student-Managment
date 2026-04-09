const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq:  { type: Number, default: 0 }
});

counterSchema.statics.getNextSequence = async function (name) {
  const result = await this.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  return result.seq;
};

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
