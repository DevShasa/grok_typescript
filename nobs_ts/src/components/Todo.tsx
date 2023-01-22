import { useTodos } from '../Context/TodoContext'
import { useRef } from 'react'
//import { Todo, ActionType } from '../utils'
import Heading from './Heading'


const TodoComponent = () => {

    const { todos, todoDispatch } = useTodos()
    const newTodoRef = useRef<HTMLInputElement>(null)

    const onAddTodo = ()=>{
        // make sure the ref has a value
        if(newTodoRef.current){
            todoDispatch({type:"ADD", text:newTodoRef.current.value})
            newTodoRef.current.value = ""
        }
    }

    return (
        <div>
            <Heading title="Todo Section"/>
            <div className="todoInput">
                <input type="text" ref={newTodoRef}/>
                <button onClick={onAddTodo}>
                Add Todo
                </button>
            </div>
            {todos.map(todo=>(
                <div key={todo.id} style={{display:"flex",gap:"5px"}}>
                    {todo.text}
                    <button onClick={()=>todoDispatch({type:"REMOVE", id:todo.id})}>
                    remove
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TodoComponent