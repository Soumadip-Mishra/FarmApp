import mongoose from "mongoose";

const ChatbotMesageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
        senderID:{
           type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
        },
        text:{
            type: String
        },
        image:{
            type: String
        }
    },
    { timestamps: true }
);

const ChatbotMesage = mongoose.model("ChatbotMesage", ChatbotMesageSchema);
export default ChatbotMesage;
