const express = require("express");
const cors = require("cors");
const db = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/api/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      console.error("Failed to fetch projects:", err);
      return res.status(500).json({ message: "Failed to fetch projects" });
    }
    res.json(results);
  });
});


app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ message: "Email is required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is invalid." });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Message is required." });
  }

  db.query(
    "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
    [name.trim(), email.trim(), message.trim()],
    (err) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res
          .status(500)
          .json({ message: "Failed to save message. Try again later." });
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New contact form message from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nMessage: ${message.trim()}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email send error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.json({ message: "Message received!" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
