const express = require('express');
const connection = require('../db'); 

const router = express.Router();

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `client` WHERE ClientID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { name, gender: initialGender, phoneNumber } = req.body;

  const [firstName, lastName] = name.split(' ');

  let gender;
  if (initialGender === 'ชาย') {
    gender = 'M';
  } else if (initialGender === 'หญิง') {
    gender = 'F';
  } else {
    gender = 'O';
  }

  connection.execute(
    "UPDATE `client` SET FirstName = ?, LastName = ?, PhoneNumber = ?, Gender = ? WHERE ClientID = ?",
    [firstName, lastName, phoneNumber, gender, id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', message: 'User information updated successfully' });
    }
  );
});

module.exports = router;
