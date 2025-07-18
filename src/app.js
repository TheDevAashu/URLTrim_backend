import { config } from "dotenv";

import express from "express";
import cors from "cors"
import urlRouter from "./routes/url.routes.js";

config();
const app = express();
app.use( cors())

app.use(express.json())

app.use("/", urlRouter);

export default app;
