import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    errorColor: string
}

const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: { key: string }) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}         // при помощи !! конвертируем error в булево значение
                helperText={error && 'Title is required!'}
                size={'small'}
            />
            <IconButton onClick={onClickAddItem}>
                <AddBox color={'primary'}/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;