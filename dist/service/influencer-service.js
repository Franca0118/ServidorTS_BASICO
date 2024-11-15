"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class InfluencerService {
    static validateId(id) {
        try {
            return new mongodb_1.ObjectId(id);
        }
        catch (error) {
            throw new Error("O id é invalido!");
        }
    }
    static validade(Influencer) {
        if (!Influencer.nome) {
            throw new Error("Nome deve ser preenchido!");
        }
        if (!Influencer.numeroDeSeguidores) {
            throw new Error("numeroDeSeguidores deve ser preenchido!");
        }
        if (!Influencer.principalRedeSocial) {
            throw new Error("numeroDeSeguidores deve ser preenchido!");
        }
    }
}
exports.default = InfluencerService;
