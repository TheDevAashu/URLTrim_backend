import { config } from "dotenv";
import express from "express";
import cors from "cors";
import urlRouter from "./routes/url.routes.js";

config();
const app = express();

app.use(express.json());


app.use(cors({ origin: '*' }));

app.use("/", urlRouter);

export default app;