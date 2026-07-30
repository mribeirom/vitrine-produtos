import multer from "multer";
import path from "path";
import fs from "fs";

// Garantir que a pasta uploads existe
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extensao = path.extname(file.originalname);
    const nomeBase = path.basename(file.originalname, extensao);
    cb(null, `${nomeBase}-${Date.now()}${extensao}`);
  },
});

export const upload = multer({ storage });
