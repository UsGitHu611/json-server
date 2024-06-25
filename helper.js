import fs from "node:fs/promises";
import path from "node:path";


export const readTodos = async (dirname) => {
    try{
        const todos = await fs.readFile(path.join(dirname,'todos.json'), {encoding: "utf8"});
        return JSON.parse(todos);
    }catch (e) {
        console.log(e.message)
    }
}

export const filterTodos = async (queryParams, dirname) => {

    try {
        const arrTodos = await readTodos(dirname);

        switch (queryParams) {
            case "alphabet" :
                const sortedAlphabet = arrTodos.toSorted((a,b) => b.title.localeCompare(a.title))
                await fs.writeFile(path.join(dirname,'todos.json'), JSON.stringify(sortedAlphabet, null, 2))
                return ;

            case "date" :
                const sortedDate = arrTodos.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                await fs.writeFile(path.join(dirname,'todos.json'), JSON.stringify(sortedDate, null, 2));
                return ;
        }

    }catch (e) {
        console.log(e.message)
    }
}
