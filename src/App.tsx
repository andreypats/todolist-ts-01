import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Typography, Toolbar, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

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

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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

        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title: title}))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
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

export default App;
