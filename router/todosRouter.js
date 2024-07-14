import {Router} from "express";
import {controller} from "../controller/todoController.js";

export const todosRouter = Router({});

todosRouter.get("/", controller.getTodos);



