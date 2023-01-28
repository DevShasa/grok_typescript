import React from 'react'
import { Todo } from '../utils/model'
import Done from './Done';
import { useTodos } from '../context/todoContext';

interface Props{
    todo:Todo;
}

const IndividualTodo:React.FC<Props> = ({todo}) => {

    const { todoDispatch, REDUCER_ACTIONS } = useTodos()

    const completedTodo = ()=>{
        todoDispatch({
            type:REDUCER_ACTIONS.MARKASDONE,
            payload:todo
        })
    }

    return (
        <div className="individual_todo">
            <p>{todo.todo}</p>
            <div>
                <Done isDone={todo.isDone}  completed={completedTodo} />
            </div>
            
        </div>
    )
}

export default IndividualTodo