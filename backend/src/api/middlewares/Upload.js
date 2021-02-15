import mutler from 'multer';

const storage = mutler.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '-' + Date.now())
  }
})

const upload = mutler({ storage: storage });

module.exports = upload;