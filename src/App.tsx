import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},//0
        {id: 2, title: "JS", isDone: true},//1
        {id: 3, title: "ReactJS", isDone: false},//2
        {id: 4, title: "ReactJS2222", isDone: false}
    ])

    const removeTask = (elID: number) => {
        //tasks=tasks.filter((el)=>el.id!==elID)
        //console.log(tasks)
        setTasks(tasks.filter((el) => el.id !== elID))
    }

    /*const [filter, setFilter] = useState('All')

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const filterTask = (nameButton: string) => {
        //console.log(nameButton)
        setFilter(nameButton)
    }*/

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                //filterTask={filterTask}
            />
        </div>
    );
}

export default App;