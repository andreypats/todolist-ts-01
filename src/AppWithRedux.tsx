import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Typography, Toolbar, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC, AddTodoListAT,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodolistWithRedux";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state=>state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state=>state.tasks)

    const dispatch = useDispatch()

    //BLL:
    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID))

    }
    const removeTodoList = (todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        let action: AddTodoListAT = AddTodoListAC(title)
        dispatch(action)
    }

    //UI:
    const getTasksForRender = (todoList: TodoListType, tasks: TaskStateType) => {
        let tasksForRender: Array<TaskType>;
        switch (todoList.filter) {
            case "completed":
                tasksForRender = tasks[todoList.id].filter(task => task.isDone)
                break
            case "active":
                tasksForRender = tasks[todoList.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[todoList.id]
        }
        return tasksForRender
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper style={{padding: '10px'}}>
                    <TodoListWithRedux
                        key={tl.id}
                        todoList={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList} errorColor={"blue"}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
