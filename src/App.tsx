import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },//0
        { id: 2, title: "JS", isDone: true },//1
        { id: 3, title: "ReactJS", isDone: false },//2
        { id: 4, title: "ReactJS2222", isDone: false }
    ]

    const removeTask=(elID:number)=>{
        console.log(elID)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks1}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;