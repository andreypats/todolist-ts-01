import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},//0
        {id: v1(), title: "JS", isDone: true},//1
        {id: v1(), title: "ReactJS", isDone: false},//2
        {id: v1(), title: "React API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    console.log(tasks)

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const removeTask = (elID: string) => {
        setTasks(tasks.filter((el) => el.id !== elID))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;