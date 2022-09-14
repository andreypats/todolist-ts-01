import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

//AT - ActionType
export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    id: string

}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType,
    id: string
}

export type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            //const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: action.todolistId, title: action.title, filter: 'all'
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        default:
            return todoLists
    }
}

//AC - ActionCreator
export const RemoveTodoListAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})
export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title, id})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter, id})
