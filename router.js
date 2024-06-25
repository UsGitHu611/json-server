import {Router} from "express";
import {controller} from "./controller.js";

export const todosRouter = Router({});

todosRouter.get("/todos", controller.getTodos);
todosRouter.get("/sort", controller.sortTodos)

todosRouter.post("/todo", controller.createTodo);
todosRouter.delete("/todo/:id", controller.deleteTodo);
todosRouter.patch("/todo", controller.updateTodo);
