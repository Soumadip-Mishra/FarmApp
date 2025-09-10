import express from "express";
import {
	signUp,
	logIn,
    changePic
} from "../controllers/auth.controller.js";
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

router.post("/signup", signUp);
router.post("/login", logIn);
router.post(
	"/change/profile-pic",protectRoute,
	upload.single("profilePic"),
	changePic
);

export default router