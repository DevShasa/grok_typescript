import React from 'react'
import IndividualTodo from './IndividualTodo'
import { useTodos } from '../context/todoContext'

const TodoList:React.FC = () => {

    const {pendingTodos, completedTodos } = useTodos()

    return (
        <div className="todo_list_container">
            <div className="todo_list">
                <h3>Tasks not done</h3>
                {pendingTodos.map((t)=>{
                    return(
                        <IndividualTodo todo={t} key={t.id}/>
                    )
                })}
            </div>
            <div className="todo_list">
            <h3>Completed tasks </h3>
            {completedTodos.map((t)=>{
                return(
                    <IndividualTodo todo={t} key={t.id}/>
                )
            })}
            </div>
        </div>
    )
}

export default TodoList