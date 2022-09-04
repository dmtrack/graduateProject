const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const { generateUserData } = require("../utils/helper");
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");

// / api/auth/signUp

// 1. get data from request (email, password...)
// 2.  check if user already exists
// 3.  hash password
// 4. create user
// 5. generate tokens

router.post("/signUp", [
  check("email", "email incorrect").isEmail(),
  check("password", "minimal length of password is 8 characters").isLength({
    min: 8,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      console.log(req.body);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL EXISTS",
            code: 400,
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });
      console.log("newUser", newUser);

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({
        message: "There is a server error occured. Please, try again later",
      });
    }
  },
]);

// 1. validate data
// 2. find user
// 3. compare hashed passwords
// 4, generate token
// 5. return data

router.post("/signInWithPassword", [
  check("email", "Email is incorrect").normalizeEmail().isEmail(),
  check("password", "Password couldnt be empty").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "WRONG PASSWORD",
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res.status(500).json({
        message: "There is a server error occured. Please, try again later",
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefreshToken(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenService.generate({
      _id: data._id,
    });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "There is a server error occured. Please, try again later",
    });
  }
});

module.exports = router;
