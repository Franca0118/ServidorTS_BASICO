"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connection_1 = __importDefault(require("../db/mongo-connection"));
const http_errors_1 = __importDefault(require("http-errors"));
const influencer_service_1 = __importDefault(require("../service/influencer-service"));
class InfluencerController {
    static getAllInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield mongo_connection_1.default.getInstance();
                const db = conn.db("devweb");
                const Influencer = db.collection("influencers");
                res.status(200).json(yield Influencer.find().toArray());
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static createInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const InfluencerReq = req.body;
            try {
                influencer_service_1.default.validade(InfluencerReq);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstance();
                const db = conn.db("devweb");
                const influencers = db.collection("influencers");
                yield influencers.insertOne(InfluencerReq);
                res.status(201).json(InfluencerReq);
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static updateInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const InfluencerReq = req.body;
            let objectId;
            try {
                objectId = influencer_service_1.default.validateId(id);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstance();
                const db = conn.db("devweb");
                const Influencer = db.collection("influencers");
                if ((yield Influencer.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("O influencer com esse id não existe!"));
                    return;
                }
                try {
                    influencer_service_1.default.validade(InfluencerReq);
                }
                catch (error) {
                    next(http_errors_1.default[400](error.message));
                    return;
                }
                yield Influencer.updateOne({ _id: objectId }, { $set: InfluencerReq });
                res.status(200).json(yield Influencer.findOne({ _id: objectId }));
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static deleteInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let objectId;
            try {
                objectId = influencer_service_1.default.validateId(id);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstance();
                const db = conn.db("devweb");
                const Influencer = db.collection("influencers");
                if ((yield Influencer.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("O influencer com esse id não existe!"));
                    return;
                }
                yield Influencer.deleteOne({ _id: objectId });
                res.status(204).json({
                    menssagem: "Deletado com sucesso"
                });
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
}
exports.default = InfluencerController;
