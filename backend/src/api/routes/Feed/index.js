import { Router } from "express";
import Post from "../../models/Post";
const router = Router();

router.get(
  "/list",
  async (req, res) => {
    try {
      Post.find({})
      .populate("img")
      .populate("created_by")
      .then(elements => {
        res.status(200).send(elements);
      })
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
