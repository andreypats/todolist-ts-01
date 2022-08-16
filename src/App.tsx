import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
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

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id != todoListID ? tl : {...tl, filter: filter}))
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

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    //UI:


    const todoListComponents = todoLists.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(task => task.isDone)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }

        return (
            <TodoList
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
