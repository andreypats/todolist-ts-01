import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {
    console.log("Todo")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            return (

                <li key={task.id}>
                    <input
                        onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}
                        type="checkbox"
                        checked={task.isDone}/>
                    <span
                        className={task.isDone ? "isDone" : ""}>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>
                </li>
            )
        })
        : <span>TaskList is empty</span>


    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: { key: string }) => e.key === "Enter" && onClickAddTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={()=>props.removeTodoList(props.todoListID)}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: "hotpink"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickSetFilterCreator("all")}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickSetFilterCreator("active")}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickSetFilterCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    )
};

export default TodoList;