import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type TaskWithReduxPropsType = {
    task: TaskType
    todoListId: string
}

export const TaskWithRedux = React.memo(({task, todoListId}: TaskWithReduxPropsType) => {

    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todoListId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListId))

    const onTitleChangeHandler = (newValue: string) => dispatch(changeTaskTitleAC(task.id, newValue, todoListId))

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})