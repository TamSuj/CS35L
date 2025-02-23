import express from express
var router = express.Router()

router.post("/", async (req, res) => {
    try {
      const { firstName, lastName, username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const User = mongoose.model("User", userSchema); // arguments: model, schema
  
      const newUser = new User({
        username: username,
        email: email,
        name: firstName,
        bio: lastName,
        password: password,
      });
  
      await newUser.save();
      console.log("Test data inserted successfully!");
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;