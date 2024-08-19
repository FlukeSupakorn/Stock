const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const connection = require('../db'); 

const router = express.Router();
const saltRounds = 10;

function checkDuplicateEmail(email, callback) {
  connection.execute(
    "SELECT * FROM `seller` WHERE email = ?",
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
  const { email, role } = req.body;

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
      const table = role === 'staff' ? 'staff' : 'seller';
      connection.execute(
        `INSERT INTO \`${table}\` (SellerID, email, password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)`,
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
    "SELECT * FROM `seller` WHERE email = ?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: 'error', message: 'No user found' });
        return;
      }

      const storedPassword = users[0].password;
      const enteredPassword = req.body.password;

      bcrypt.compare(enteredPassword, storedPassword, function (err, isLogin) {
        if (isLogin) {
          const token = jwt.sign({ email: users[0].email }, 'secret', {
            expiresIn: '1h',
          });
          res.json({
            status: 'ok',
            message: 'Login success',
            token,
            userId: users[0].ClientID,
          });
        } else {
          res.json({ status: 'error', message: 'Email or Password is wrong' });
        }
      });
    }
  );
});

module.exports = router;
