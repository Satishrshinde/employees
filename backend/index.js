const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
// const xlsx = require('xlsx');
// const fs = require('fs');
// const multer = require('multer')
// const User = require('./users');
// const nodemailer = require('nodemailer');


const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://satishrshinde2014:eu5RLFRxRCmaG7Pp@cluster0.204tdqa.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true
})

  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });

// const upload = multer({ dest: "uploads/" });

app.get("/", (req, resp) => {
  resp.send("its working")
});

 app.get("/users", async (req, res) => {
   try {
     const users = await User.find({});
     res.send(users);
   } catch (err) {
     res.status(500).send({ message: err.message });
   }
 });
 app.get("/users/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const user = await User.findOne({ _id: userId });
     if (!user) {
       return res.status(404).send({ message: "User not found" });
     } else {
       res.send(user.files);
     }
   } catch (err) {
     console.log(err);
   } finally {
     console.log("COMPLETED");
   }
 });

app.post("/signup", async (req, res) => {
  console.log("signup")
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
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successful", user });
      } else {
        res.send({ message: "Password incorrect" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
});

// app.post("/fileUploader", upload.single("file"), async (req, res) => {
//   // file content with user id
//   // then file will be stored against that user
//   const file = req.file;
//   const userId = req.body.userId;
//   console.log("FILE", req.body);
//   const workbook = xlsx.readFile(file.path);
//   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//   const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//   // Assuming your Excel has a header row, skip the first row (index 0)
//   const data = jsonData.slice(1);

//   // Save the file information to the user in MongoDB
//   User.findByIdAndUpdate(
//     userId,
//     { $push: { files: { filename: file.originalname, path: file.path } } },
//     { new: true }
//   )
//     .then((updatedUser) => {
//       // File uploaded and user updated successfully
//       res
//         .status(200)
//         .json({ message: "File uploaded successfully!", user: updatedUser });
//     })
//     .catch((error) => {
//       // Error occurred while saving the data
//       res.status(500).json({ error: "Error saving data to the database." });
//     });
// });

// function convertExcelDate(serialNumber) {
//   const date = new Date((serialNumber - 25569) * 86400 * 1000);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// }

// app.get("/users/:userId/:fileId", (req, res) => {
//   const { userId, fileId } = req.params;
//   // Assuming you have a User model imported
//   User.findOne({ _id: userId })
//     .then((user) => {
//       if (!user) {
//         throw new Error("User not found");
//       }
//       const file = user.files.find((file) => file._id.toString() === fileId);
//       if (!file) {
//         console.log("error")
//         throw new Error("File not found");
//       }
//       fs.readFile(file.path, (err, data) => {
//         if (err) {
//           console.error("Error reading file:", err);
//           return res.status(500).send("Error reading file");
//         }

//         const workbook = xlsx.read(data, { type: "buffer" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//         // Convert Excel date values to "yyyy-mm-dd" format
//         for (let i = 0; i < jsonData.length; i++) {
//           const row = jsonData[i];
//           for (let j = 0; j < row.length; j++) {
//             const cellValue = row[j];
//             if (typeof cellValue === "number" && cellValue > 59) {
//               row[j] = convertExcelDate(cellValue);
//             }
//           }
//         }
//         res.json(jsonData);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching file content:", error);
//       res.status(404).send("File not found");
//     });
// });
// const EMAIL_USER = process.env.EMAIL_USER || 'satishrshinde2014@gmail.com';
// const EMAIL_PASS = process.env.EMAIL_PASS || 'mrdgbwxqdlylfxjp';
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   },
// });


// const sendBirthdayEmail = (recipientEmail) => {
//   const mailOptions = {
//     from: 'satishrshinde2014@gmail.com', // Your email address
//     to: recipientEmail,
//     subject: 'Happy Birthday!',
//     text: 'Happy birthday! We wish you all the best!',
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };
// app.post('/send-birthday-email', (req, res) => {
//   const { employeeEmail } = req.body;
//   if (employeeEmail && /\S+@\S+\.\S+/.test(employeeEmail)) {
//     sendBirthdayEmail(employeeEmail);
//     res.status(200).json({ message: 'Email sent successfully.' });
//   } else {
//     res.status(400).json({ error: 'Invalid email address.' });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
