import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {DeleteForever, DeleteOutline} from "@material-ui/icons";
import {TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./reducers/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoList: TodoListType,
}

const TodoListWithRedux = ({todoList}: TodoListPropsType) => {

    let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()

    const tasksItems = tasksForTodolist.length
        ? tasksForTodolist.map((task: TaskType) => {

            const changeTaskTitle = (title: string) => {
                dispatch(changeTaskTitleAC(task.id, title, todoList.id))
            }

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todoList.id))
            }

            return (

                <div key={task.id} className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={task.isDone}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>

                    <IconButton onClick={() => dispatch(removeTaskAC(task.id, todoList.id))}>
                        <DeleteForever/>
                    </IconButton>
                </div>
            )
        })
        : <span>TaskList is empty</span>

    const addTask = (title: string) => dispatch(addTaskAC(title, todoList.id))

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodoListFilterAC(filter, todoList.id))

    const removeTodoList = () => dispatch(RemoveTodoListAC(todoList.id))

    const changeTodoListTitle = (title: string) => dispatch(ChangeTodoListTitleAC(title, todoList.id))

    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <DeleteOutline/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <div>
                {tasksItems}
            </div>
            <div>
                <ButtonGroup variant='contained' size='small' disableElevation={true}>
                    <Button
                        color={todoList.filter === "all" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        color={todoList.filter === "active" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        color={todoList.filter === "completed" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default TodoListWithRedux;