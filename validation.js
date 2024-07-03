import {body} from "express-validator";


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

export const updateTodosValidate = [
    body("id")
        .notEmpty()
        .withMessage("поле id пустое!")
        .trim()
        .isString()
        .withMessage("поле id не является строкой!"),
    body("title")
        .notEmpty()
        .withMessage("поле title пустое!")
        .trim()
];
