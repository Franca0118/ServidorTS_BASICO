import { NextFunction, Request, Response } from "express";
import MongoConnection from "../db/mongo-connection";
import createError from "http-errors";
import { ObjectId } from "mongodb";
import InfluencerService from "../service/influencer-service";
import InfluencerModel from "../model/influencer-model";

export default class InfluencerController {

    public static async getAllInfluencer(req: Request, res: Response, next: NextFunction) {
        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const Influencer = db.collection("influencers");
            res.status(200).json(await Influencer.find().toArray());
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async createInfluencer(req: Request, res: Response, next: NextFunction) {
        const InfluencerReq: InfluencerModel = req.body;

        try {
            InfluencerService.validade(InfluencerReq);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const influencers = db.collection("influencers");
            await influencers.insertOne(InfluencerReq);
            res.status(201).json(InfluencerReq);
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async updateInfluencer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const InfluencerReq: InfluencerModel = req.body;
        let objectId: ObjectId;

        try {
            objectId = InfluencerService.validateId(id);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const Influencer = db.collection("influencers");

            if (await Influencer.countDocuments({ _id: objectId }) === 0) {
                next(createError[404]("O influencer com esse id não existe!"));
                return;
            }

            try {
                InfluencerService.validade(InfluencerReq);
            } catch (error) {
                next(createError[400]((error as Error).message));
                return;
            }

            await Influencer.updateOne({ _id: objectId }, { $set: InfluencerReq });
            res.status(200).json(await Influencer.findOne({ _id: objectId }));

        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async deleteInfluencer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        let objectId: ObjectId;

        try {
            objectId = InfluencerService.validateId(id);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const Influencer = db.collection("influencers");

            if (await Influencer.countDocuments({ _id: objectId }) === 0) {
                next(createError[404]("O influencer com esse id não existe!"));
                return;
            }

            await Influencer.deleteOne({ _id: objectId });
            res.status(204).json({
                menssagem: "Deletado com sucesso"
            });

        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

}