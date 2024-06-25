import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import {todosRouter} from "./router.js";

const app = express();
configDotenv();

app.use(express.json());
app.use(cors());
app.use(todosRouter)


app.listen(process.env.PORT, () => {
    console.log(`serve port ${process.env.PORT}`)
});