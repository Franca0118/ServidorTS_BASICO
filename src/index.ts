/**
ATIVIDADE PRÁTICA AVALIATIVA
Turma: 3A2 
Alunos:
João Victor França Rafael
Itallo Mariano Ferreira
*/

import express from "express";
import cors from "cors";
import handlerError from "./middleware/handler-error";
import InfluencerRouter from "./router/influencer-router";

const port = process.env.WS_PORT ?
    parseInt(process.env.WS_PORT) :
    3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/influencers", InfluencerRouter);
app.use(handlerError());

app.listen(port, () => {
    console.log(`Servidor Web sendo executado na porta ${port}`);
});