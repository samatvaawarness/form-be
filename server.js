import express from "express";
import cors from "cors";
import sendMailHandler from "./api/send-mail.js";
import dotenv from "dotenv";


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();


// Mount the Vercel handler on local route
app.post("/send-mail", (req, res) => sendMailHandler(req, res));

// Serve index.html
app.use(express.static("public"));

app.listen(5050, () => {
  console.log("Local server running on PORT 5050");
});
