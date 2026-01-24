const multer = require("multer");
const path = require("path");
const firebaseConfig = require("../config/firebase.config");

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const { initializeApp } = require("firebase/app");

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

// ================= MULTER =================
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) return cb(null, true);
  cb(new Error("Image only"));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

// ================= FIREBASE =================
async function uploadToFirebase(req, res, next) {
  if (!req.file) return next();

  try {
    const storageRef = ref(
      firebaseStorage,
      `uploads/${Date.now()}-${req.file.originalname}`
    );

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      { contentType: req.file.mimetype }
    );

    req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message || "Firebase upload failed",
    });
  }
}

module.exports = {
  upload,           // 👈 multer instance
  uploadToFirebase, // 👈 firebase middleware
};
