import { ObjectId } from "mongodb";
import Influencer from "../model/influencer-model";

export default class InfluencerService {
    public static validateId(id: string): ObjectId {
        try {
            return new ObjectId(id);
        } catch (error) {
            throw new Error("O id é invalido!")
        }
    }

    public static validade(Influencer: Influencer) {
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