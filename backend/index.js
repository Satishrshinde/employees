const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./users')
const app = express()
app.use(cors());
app.use(express.json());
const url = 'mongodb+srv://satishrshinde2014:mz6w8UJ2AjX27ES6@cluster1.8rtxckj.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });


app.get("/post", (req, resp) => {
  resp.send("its working")
});
app.post("/signUp", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email
    });

    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const newSignUp = new User({
        username,
        email,
        password
      });
      await newSignUp.save();
      res.send({ message: "Signed up successfully" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("server is running")
});