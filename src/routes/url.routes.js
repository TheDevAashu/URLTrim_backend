import express from "express";
import { findLongUrl, shortenUrl } from "../controllers/url.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", shortenUrl);
urlRouter.get("/:id", findLongUrl)

export default urlRouter;
