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
exports.default = seed;
const mongo_connection_1 = __importDefault(require("../db/mongo-connection"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield mongo_connection_1.default.getInstance();
        const db = conn.db("devweb");
        const games = db.collection("games");
        if ((yield games.countDocuments()) === 0) {
            const data = [
                { nome: "The Legend Of Zelda: Ocarina Of Time", produtora: "Nintendo" },
                { nome: "Super Mario World", produtora: "Nintendo" },
                { nome: "Pokemon Red/Blue", produtora: "Nintendo" },
                { nome: "Super Mario 64", produtora: "Nintendo" },
                { nome: "Sonic The Hedgehog 2", produtora: "Sega" },
                { nome: "Goldeneye 007", produtora: "Nintendo" },
                { nome: "Tetris", produtora: "Tetris Company" },
                { nome: "Pac-Man", produtora: "Midway Games" },
                { nome: "Metal Gear Solid", produtora: "Konami" },
                { nome: "Donkey Kong", produtora: "Nintendo" },
            ];
            yield games.insertMany(data);
            console.log("Coleção Games populada com sucesso!");
        }
        else {
            console.log("Coleção Games já está populada!");
        }
    });
}
