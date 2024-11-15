import express from "express";
import InfluencerController from "../controller/influencer-controller";

const influencerRouter = express.Router();

influencerRouter.get("/", InfluencerController.getAllInfluencer);
influencerRouter.post("/", InfluencerController.createInfluencer);
influencerRouter.put("/:id", InfluencerController.updateInfluencer);
influencerRouter.delete("/:id", InfluencerController.deleteInfluencer);

export default influencerRouter;