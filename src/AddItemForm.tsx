import React, {ChangeEvent, useState} from 'react';

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
    const inputErrorStyles = error
        ? {
            border: `2px solid ${props.errorColor}`,
            outline: 'none',
        }
        : {};

    return (
        <div>
            <input
                style={inputErrorStyles}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div style={{color: props.errorColor}}>Title is required!</div>}
        </div>
    );
};

export default AddItemForm;