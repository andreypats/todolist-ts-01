import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodolistAT} from "./todolists-reducer";

//AT - ActionType
type RemoveTaskActionAT = ReturnType<typeof removeTaskAC>
type AddTaskActionAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionAT = ReturnType<typeof changeTaskTitleAC>

export type ActionType = RemoveTaskActionAT | AddTaskActionAT | ChangeTaskStatusActionAT | ChangeTaskTitleActionAT | AddTodoListAT | RemoveTodolistAT

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task=>task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.isDone}: task)
        }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title}: task)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]:[]
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            // const {[action.id]: [],...rest} = {...state}   // - деструктуризация
            // return rest
        default:
            return state
    }
}

//AC - ActionCreator
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}


