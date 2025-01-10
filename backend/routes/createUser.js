const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = 'MYNAMEISRAJUPRASAD'

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be 6 character long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    try {
      await user
        .create({
          name: req.body.name,
          password: hash,
          email: req.body.email,
          location: req.body.location,
        })
        .then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 6 character long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({email});
      if (!userData) {
        return res
          .status(400)
          .json({ error: "Enter a valid email address..." });
      }

      const pwdCompare =  bcrypt.compare(req.body.password, userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ error: "Enter a valid password..." });
      }
      if(pwdCompare){
        const data = {
          user :{
            id: userData.id
          }
        }
        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true , authToken : authToken});
      }
      } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

