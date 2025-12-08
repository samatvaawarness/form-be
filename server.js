import express from "express";
import cors from "cors";
import sendMailHandler from "./api/send-mail.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Mount the Vercel handler on local route
app.post("/send-mail", (req, res) => sendMailHandler(req, res));

app.listen(5050, () => {
  console.log("Local server running on PORT 5050");
});
