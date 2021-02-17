import { Router } from 'express';
import jwt_decode from "jwt-decode";
import User from '../../models/User';

const router = Router();

router.get('/me', (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt_decode(token)
  User.findById(decoded._id)
  .then(element => {
    res.send(element)
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
