import {createTodosValidate, updateTodosValidate} from "../validation.js";
import {controller} from "../controller/todoController.js";
import {Router} from "express";

export const todoRouter = Router({});

todoRouter.post("/", ...createTodosValidate, controller.createTodo);
todoRouter.patch("/", ...updateTodosValidate ,controller.updateTodo);
todoRouter.delete("/:id", controller.deleteTodo);
