const mongodb = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;
mongodb.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
