const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const connection = require('../db'); 

const router = express.Router();
const saltRounds = 10;
const secret = "onlineshop-login";

function checkDuplicateEmail(email, callback) {
  connection.execute(
    "SELECT * FROM `client` WHERE email = ?",
    [email],
    function (err, results, fields) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results.length > 0);
    }
  );
}

router.post('/register', function (req, res, next) {
  const { email } = req.body;

  checkDuplicateEmail(email, (err, isDuplicate) => {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }

    if (isDuplicate) {
      res.json({ status: 'error', message: 'Email already exists' });
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newUserId = uuidv4();
      connection.execute(
        "INSERT INTO `client` (ClientID, email, password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)",
        [newUserId, req.body.email, hash, req.body.fname, req.body.lname],
        function (err, results, fields) {
          if (err) {
            res.json({ status: 'error', message: err });
            return;
          }
          res.json({ status: 'ok' });
        }
      );
    });
  });
});

router.post('/login', function (req, res, next) {
  connection.execute(
    "SELECT * FROM `client` WHERE email = ?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (users.length == 0) {
        res.json({ status: 'error', message: 'no user found' });
        return;
      }

      const storedPassword = users[0].Password;
      const enteredPassword = req.body.password;

      bcrypt.compare(enteredPassword, storedPassword, function (err, isLogin) {
        if (isLogin) {
          var token = jwt.sign({ email: users[0].email }, secret, {
            expiresIn: '1h',
          });
          res.json({
            status: 'ok',
            message: 'login success',
            token,
            userId: users[0].ClientID,
          });
        } 
        else {
          res.json({ status: 'error', message: 'Email or Password is wrong' });
        }
      });
    }
  );
});

router.post('/authentication', function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: 'ok', decoded: decoded });
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

module.exports = router;
