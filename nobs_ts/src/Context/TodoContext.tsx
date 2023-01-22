import React, { createContext, PropsWithChildren, useReducer, useContext } from 'react'

interface Todo{
    id:number;
    done:boolean;
    text:string;
}
    
type ActionType = 
    | { type:"ADD", text: string}
    | {type:"REMOVE", id: number}

interface todoContext{
    todos:Todo[];
    todoDispatch: React.Dispatch<ActionType>
}

const TodoContextStore = createContext<todoContext| null>(null)
export const useTodos = ():todoContext=>{
    const todoPlusDispatch = useContext(TodoContextStore)
    if(!todoPlusDispatch) throw new Error("Something wrong")
    return todoPlusDispatch
}

const TodoContext:React.FC<PropsWithChildren> = ({children}) => {
const [todos, todoDispatch] = useReducer(todoReducer, [])
    const value = {
        todos,
        todoDispatch
    }
    return (
        <TodoContextStore.Provider {...{value}}>
            {children}
        </TodoContextStore.Provider>
    )
}

export default TodoContext

const todoReducer = (state:Todo[], action:ActionType) =>{
    // todoReducer takes in existing state object and action type
    // we will not be accessing totoreducer directly that is handled by the hook
    // useReducer only exposes dispatch which we use as dispatch(action)
    switch(action.type){
    case "ADD":
        return [...state, {id:state.length, done:false, text:action.text}]
    case "REMOVE":
        return state.filter(({id})=> action.id != id)
    default:
        throw new Error()
    }
}