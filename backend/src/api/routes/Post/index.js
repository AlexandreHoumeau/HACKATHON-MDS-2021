import { Router } from "express";
import Post from "../../models/Post";
import PhotoPost from "../../models/PhotoPost";
import multer from "multer";
const router = Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/upload",
  upload.single("upload"),
  async (req, res) => {
    try {
      const newPhotoPost = new PhotoPost({
        image: req.file.buffer,
        title: req.file.originalname,
      });
      newPhotoPost.save().then((results) => {
        const newPost = new Post({
          title: req.query.title,
          content: req.query.content,
          link: req.query.link,
          img: results.id,
          created_by: req.query.created_by
        });

        newPost.save().then((doc) => {
          res.send(doc);
        });
      });
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
