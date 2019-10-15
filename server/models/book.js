let mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  description: String,
  published_year: { type: Number }
});

module.exports = mongoose.model("Book", BookSchema);
