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
          created_by: req.query.created_by, 
          style: req.query.style
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

router.get(
  "/search",
  async (req, res) => {
    try {
      Post.find({"$or": [ { "title" : { $regex: req.query.keyword }}, { "content" : { $regex: req.query.keyword }}, { "style" : { $regex: req.query.keyword }}]})
      .populate('created_by')
      .populate('img')
      .then(elements => {
        res.send(elements)
      })
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res) => {
    res.status(400).send({ error: error.message });
  }
);

router.put("/like", async (req) => {
  const { postId } = req.body;
  let isLiked = new Boolean
  let likes = ''
  await Post.findById(postId)
  .then(element => {
    isLiked = element.liked
    likes = element.likes
  })
  Post.findByIdAndUpdate(postId, {liked: !isLiked, likes: isLiked ? likes + 1 : likes - 1})
  .then(element => {
    console.log(element)
  })
  
})

router.get("/favorites", async (req, res) => {
  console.log("Hello World")
    try {
      Post.find({liked: true})
      .populate("img")
      .populate("created_by")
      .then(elements => {
        console.log(elements)
        res.status(200).send(elements);
      })
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res) => {
    res.status(400).send({ error: error.message });
  }
)


module.exports = router;
