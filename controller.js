import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {filterTodos, readTodos} from "./helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Controller{

    async getTodos(req, res){
        try {
            const todosJson = await readTodos(__dirname);
            const limit = +req.query?.limit || todosJson?.length;
            const offset = +req.query?.offset || 0;

            res.send(JSON.stringify(todosJson.slice(offset,limit + offset)));
        }catch (e) {
            console.log(e.message)
        }
    }

    async createTodo(req, res) {
        if (!Object.keys(req.body)?.length){
            res.status(400).send({message: "Передайте параметры todo"})
            return;
        }

        try {
            const {id, title, date} = req.body;
            const todosJson = await readTodos(__dirname);

            todosJson.push({ id, title, date });

            await fs.writeFile(path.join(__dirname,'todos.json'), JSON.stringify(todosJson, null, 2))

            res.status(200).send({message: "todo успешно создано"})
        }catch (e) {
            console.log(e.message)
        }
    }

    async deleteTodo(req, res){
        try {
            const { id } = req.params;
            const todosJson = await readTodos(__dirname);
            const todoDelete = todosJson.filter( (todo) => todo.id !== id );

            await fs.writeFile(path.join(__dirname,'todos.json'), JSON.stringify(todoDelete, null, 2));

            res.status(200).send({message: "todo успешно удалена"})
        }catch (e) {
            console.log(e.message)
        }
    }

    async updateTodo(req, res){

        if (!Object.keys(req.body)?.length){
            res.status(404).send({message: "Передайте параметры todo"})
            return;
        }

        try {
            const body = req.body;
            const todosJson = await readTodos(__dirname);
            const findTodo = todosJson.find((todo) => todo.id === body.id );

            findTodo.title = body?.title;
            await fs.writeFile(path.join(__dirname,'todos.json'), JSON.stringify(todosJson, null, 2));

            res.status(200).send(JSON.stringify(findTodo))
        }catch (e) {
            console.log(e.message)
        }
    }

    async sortTodos(req, res){
        try {
           await filterTodos(req.query.f, __dirname);
           res.status(200).send({message: "todos успешно отсортированны"})
        }catch (e) {
            console.log(e.message)
        }
    }
}

export const controller = new Controller();