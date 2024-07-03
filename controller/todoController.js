import { validationResult } from "express-validator";
import { filterTodos, readTodos, writeTodos } from "../helper.js";

class TodoController {

    async getTodos(req, res){
        try {
            const todosJson = await readTodos();
            const limit = +req.query?.limit || todosJson?.length;
            const offset = +req.query?.offset || 0;
            
            res.send(JSON.stringify(todosJson.slice(offset,limit + offset)));
        }catch (e) {
            res.status(500).send(e.message)
        }
    }

    async createTodo(req, res) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
           return  res.status(404).json({ error: error.array() })
        }

        try {
            const {id, title, date} = req.body;
            const todosJson = await readTodos();
            todosJson.push({ id, title, date });
            await writeTodos(todosJson)

            res.status(200).send({message: "todo успешно создано"})
        }catch (e) {
            res.status(500).send(e.message)
        }
    }

    async deleteTodo(req, res){

        try {
            const { id } = req.params;
            const todosJson = await readTodos();
            const todoDelete = todosJson.filter( (todo) => todo.id !== id );
            await writeTodos(todoDelete);

            res.status(200).send({message: "todo успешно удалена"})
        }catch (e) {
            res.status(500).send(e.message)
        }
    }

    async updateTodo(req, res){
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return  res.status(404).json({ error: error.array() })
        }

        try {
            const body = req.body;
            const todosJson = await readTodos();
            const findTodo = todosJson.find((todo) => todo.id === body.id );

            findTodo.title = body?.title;
            await writeTodos(findTodo);

            res.status(200).send(JSON.stringify(findTodo))
        }catch (e) {
            res.status(500).send(e.message)
        }
    }

    async sortTodos(req, res){
        try {
           await filterTodos(req.query.f);
           res.status(200).send({message: "todos успешно отсортированны"})
        }catch (e) {
            res.status(500).send(e.message)
        }
    }
}

export const controller = new TodoController();