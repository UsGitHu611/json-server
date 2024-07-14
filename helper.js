import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readTodos = async () => {
    try{
        const todos = await fs.readFile(path.join(__dirname,'todos.json'), {encoding: "utf8"});
        return JSON.parse(todos);
    }catch (e) {
        console.log(e.message)
    }
}

export const writeTodos = async (data) => {
    try{
        return await fs.writeFile(path.join(__dirname,'todos.json'), JSON.stringify(data, null, 2))
    }catch(e){
        console.log(e.message)
    }
}

export const filterTodos = async (queryParams) => {
    
    try {
        const arrTodos = await readTodos();
        
        switch (queryParams) {
            case "alphabet" :
                const sortedAlphabet = arrTodos.toSorted((a,b) => b.title.localeCompare(a.title))
                await writeTodos(sortedAlphabet);
                return JSON.stringify(sortedAlphabet, null, 2);

            case "date" :
                const sortedDate = arrTodos.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                await writeTodos(sortedDate);
                return JSON.stringify(sortedDate, null, 2);
        }

    }catch (e) {
        console.log(e.message)
    }
}
