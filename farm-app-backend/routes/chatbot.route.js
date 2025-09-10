import express from "express";
import { getChatbotMessages, prompt, uploadInput } from "../controllers/chatbot.controller.js";
import multer from "multer";
import { protectRoute } from "../middleware/auth.middleware.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./my-uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split(".").pop();
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
        req.localImageURL =
            "./my-uploads/" + file.fieldname + "-" + uniqueSuffix + "." + ext;
    },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/get-chatbot-messages", protectRoute, getChatbotMessages);
router.post("/upload-input", protectRoute, upload.single("image"), uploadInput);
router.post("/send-prompt", protectRoute, upload.single("image"), prompt);
export default router