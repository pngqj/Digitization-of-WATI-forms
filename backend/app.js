const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.Promise = global.Promise;
const is_dev = true
if (is_dev) {
  mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb+srv://queuejay:NIEtempDatabase2020@nietempdatabase-fdbbl.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
  });
}

const app = express();
app.use(cookieParser());

const whitelist = [undefined, "http://localhost:5000", "http://localhost:3000", "https://atconsideration.rdc.nie.edu.sg"]

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/users", require("./routes/users"));
app.use("/formdata", require("./routes/formdata"));

// Handles any requests that don't match the ones above
app.use(express.static(__dirname + '/build'));
app.get('*', (req,res) =>{
  res.sendFile(__dirname+'/build/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);

module.exports = app;
