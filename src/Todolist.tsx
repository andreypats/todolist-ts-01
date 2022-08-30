import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";

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
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {
    console.log("Todo")
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListID)
            }

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)

            return (

                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={task.isDone}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>

                    <IconButton onClick={() => props.removeTask(task.id, props.todoListID)}>
                        <DeleteForever/>
                    </IconButton>
                    {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}

                </li>
            )
        })
        : <span>TaskList is empty</span>

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <ButtonGroup variant='contained' size='small' disableElevation={true}>
                    <Button
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        className={props.filter === "active" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        className={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default TodoList;