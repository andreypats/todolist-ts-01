import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (elID: string) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {

    const [filter, setFilter] = useState('All')

    let filteredTasks = props.tasks

    if (filter === 'Active') {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }

    const filterTask = (nameButton: string) => {
        setFilter(nameButton)
    }

    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const filterTaskHandler = (value: string) => {
        filterTask(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button callBack={addTaskHandler} nickName={'+'}/>
            </div>
            <ul>
                {filteredTasks.map((el, index) => {
                    const removeTaskHandler = () => {
                        props.removeTask(el.id)
                    }

                    return (
                        <li key={index}>
                            {/*<button onClick={removeTaskHandler}>X</button>*/}
                            <Button callBack={removeTaskHandler} nickName={'X'}/>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>

                        </li>
                    )
                })}


            </ul>
            <div>
                <Button callBack={() => filterTaskHandler('All')} nickName={'All'}/>
                <Button callBack={() => filterTaskHandler('Active')} nickName={'Active'}/>
                <Button callBack={() => filterTaskHandler('Completed')} nickName={'Completed'}/>

                {/*<button onClick={() => filterTaskHandler('All')}>All*/}
                {/*</button>*/}
                {/*<button onClick={() => filterTaskHandler('Active')}>Active*/}
                {/*</button>*/}
                {/*<button onClick={() => filterTaskHandler('Completed')}>Completed*/}
                {/*</button>*/}
            </div>
        </div>
    )
}