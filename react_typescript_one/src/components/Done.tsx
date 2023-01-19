import React from 'react'
import { Todo } from '../utils/model';

interface Props{
    isDone:Boolean;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    id:number

}


const Done:React.FC<Props> = ({isDone, setTodos, id}) => {

    const handleTodo = () =>{
        setTodos((state) =>{
                state.map((todoItem)=>{
                if(todoItem.id === id){

                    todoItem.isDone = todoItem.isDone
                    console.log("CHANGED TASK STATUS", todoItem)
                }
                return todoItem
        })})
    }
    

    return (
        <button className={`task_indicator ${isDone ? "done" : "not_done" }`} onClick={handleTodo}>
            {isDone ? "Done" :"Not Done"}
        </button>
    )
}

export default Done