const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { port_no, mongo_URL } = require("./constants");


mongoose.Promise = global.Promise;
mongoose.connect(mongo_URL, {
  useNewUrlParser: true
});

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
app.use("/file", require("./routes/file"));
app.use(express.static(__dirname + '/uploaded_img'));


// Handles any requests that don't match the ones above
app.use(express.static(__dirname + '/build'));
app.get('*', (req,res) =>{
  res.sendFile(__dirname+'/build/index.html');
});

const port = process.env.PORT || port_no;
app.listen(port);
console.log(`Server listening at ${port}`);

module.exports = app;
