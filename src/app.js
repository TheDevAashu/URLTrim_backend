import { config } from "dotenv";

import express from "express";
import cors from "cors";
import urlRouter from "./routes/url.routes.js";

config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://url-trime-aashu-singhs-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", urlRouter);

export default app;
