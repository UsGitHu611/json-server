import {body, param} from "express-validator";


export const createTodosValidate = [
    body("id")
        .notEmpty()
        .withMessage("поле id пустое!")
        .trim()
        .isString(),
    body("title")
        .notEmpty()
        .withMessage("поле title пустое!")
        .trim()
        .isString(),
    body("date")
        .notEmpty()
        .withMessage("поле date пустое!")
        .trim()
        .isString(),
]

export const deleteTodosValidate = [
    param("id")
        .exists()
        .withMessage("id отсутствует!")
        .isString()
        .withMessage("id должен быть строкой!")
]
