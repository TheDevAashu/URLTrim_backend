import express from "express";
import { findLongUrl, getAllUrl, shortenUrl } from "../controllers/url.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", shortenUrl);
urlRouter.post("/getAllUrl", getAllUrl);
urlRouter.get("/:id", findLongUrl)

export default urlRouter;
