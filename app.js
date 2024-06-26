import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import {todoRouter} from "./router/todoRouter.js";
import {todosRouter} from "./router/todosRouter.js";

const app = express();
configDotenv();

app.use(express.json());
app.use(cors());
app.use("/todos", todosRouter)
app.use("/todo", todoRouter)


app.listen(process.env.PORT, () => console.log(`port listen`));