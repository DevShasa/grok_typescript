import React from 'react'
import { Todo } from '../utils/model'
import IndividualTodo from './IndividualTodo'

interface Props{
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC<Props> = ({todos, setTodos}) => {
    return (
        <div className="todo_list">
            {todos.map((t)=>{
                return(
                    <IndividualTodo todo={t} key={t.id} setTodos={setTodos}/>
                )
            })}
        </div>
    )
}

export default TodoList