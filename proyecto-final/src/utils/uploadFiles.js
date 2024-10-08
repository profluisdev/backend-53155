import multer from "multer";
import path from "path";
import fs from "fs";
import customErrors from "../errors/customErrors.js";

const ensureDirectoriesExist = () => {
    const directories = ["public/uploads/profiles", "public/uploads/products", "public/uploads/documents"];

    directories.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

ensureDirectoriesExist();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "profile") {
            cb(null, "./public/uploads/profiles")
        } else if (file.fieldname === "imgProduct") {
            cb(null, "./public/uploads/products")
        } else if (file.fieldname === "document") {
            cb(null, "./public/uploads/documents")
        } else {
            cb(customErrors.badRequestError("Invalid fieldname"), null);
        }
    },
    filename: (req, file, cb) => {
        const userId = req.user._id;
        const extension = path.extname(file.originalname); // Obtiene la extensión del archivo 
        const basename = path.basename(file.originalname, extension); // Obtiene el nombre del archivo sin la extensión
        cb(null, `${basename}-${userId}${extension}`)
    },
});

export const upload = multer({ storage });
