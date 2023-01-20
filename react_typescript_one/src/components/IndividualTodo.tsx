import React from 'react'
import { Todo } from '../utils/model'
import Done from './Done';

interface Props{
    todo:Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}

const IndividualTodo:React.FC<Props> = ({todo, setTodos}) => {
    return (
        <div className="individual_todo">
            <p>{todo.todo}</p>
            <div>
                <Done isDone={todo.isDone}  setTodos={setTodos} id={todo.id}/>
            </div>
            
        </div>
    )
}

export default IndividualTodo