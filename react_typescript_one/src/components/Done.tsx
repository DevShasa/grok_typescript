import React from 'react'

interface Props{
    isDone:Boolean;
    completed:() => void

}


const Done:React.FC<Props> = ({isDone, completed}) => {
    return (
        <button className={`task_indicator ${isDone ? "done" : "not_done" }`} onClick={completed}>
            {isDone ? "Done" :"Not Done"}
        </button>
    )
}

export default Done