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

function AppWithReducer() {

    let todoListID_1 = v1()
    let todoListID_2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true}, // => t
            {id: v1(), title: "CSS", isDone: true}, // => {...t, isDone}
            {id: v1(), title: "JS/TS", isDone: false}, // => t
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true}, // => t
            {id: v1(), title: "Tea", isDone: true}, // => {...t, isDone}
            {id: v1(), title: "Beer", isDone: false}, // => t
        ],
    })

    //BLL:
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(filter, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListID))

    }
    const removeTodoList = (todoListID: string) => {
        dispatchToTodoLists(RemoveTodoListAC(todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        let action: AddTodoListAT = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForRender(tl, tasks)}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
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

export default AppWithReducer;
