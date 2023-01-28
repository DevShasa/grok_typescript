import {useReducer, useContext, PropsWithChildren, createContext, useMemo} from "react";
import { Todo } from "../utils/model";

type TodoStateType ={
    // this is for the reducer
    allTodos:Todo[]
}

const initialTodoState:TodoStateType = {allTodos:[]}

const REDUCER_ACTION_TYPE = {
    ADD:"ADD", 
    REMOVE:"REMOVE",
    MARKASDONE:"MARKASDONE"
}

export const ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type:string,
    payload: Todo
}

const todoReducer = (state:TodoStateType, action:ReducerAction): TodoStateType =>{
    switch(action.type){
        case REDUCER_ACTION_TYPE.ADD:{
            const {id} = action.payload
            // check that the reducer is not already inside state
            const isTodoPresent = state.allTodos.filter((td)=> td.id === id)
            
            return isTodoPresent.length === 0 ? { ...state, allTodos:[...state.allTodos, action.payload] } : state
        }
        case REDUCER_ACTION_TYPE.REMOVE:{
            const filteredTodoList = state.allTodos.filter(td => td.id !== action.payload.id)
            return { ...state, allTodos:filteredTodoList }
        }
        case REDUCER_ACTION_TYPE.MARKASDONE:{
            const newtodos = state.allTodos.map((item)=>{
                return item.id === action.payload.id ? {...item, isDone:!item.isDone } : item 
            })
            return {...state, allTodos:newtodos}
        }
        default:
            throw new Error("Unidentified action type")
    }
}

const useTodoContext = (initState:TodoStateType) =>{
    const [ todoState, todoDispatch] = useReducer(todoReducer, initState)
    const REDUCER_ACTIONS = useMemo(()=>{
        return REDUCER_ACTION_TYPE
    },[])

    let pendingTodos = todoState.allTodos.filter(td => td.isDone === false)
    const completedTodos = todoState.allTodos.filter(td => td.isDone === true)
    const allTodos = todoState.allTodos.sort((a,b)=>{
        return b.id - a.id
    })

    pendingTodos = pendingTodos.sort((a,b)=>{
        return b.id - a.id
    })

    return { pendingTodos, completedTodos, allTodos, todoDispatch, REDUCER_ACTIONS }

}

export type UseTodoContextType = ReturnType<typeof useTodoContext>

const initialContextState:UseTodoContextType = {
    todoDispatch:()=>{},
    REDUCER_ACTIONS:REDUCER_ACTION_TYPE,
    pendingTodos:[],
    completedTodos:[],
    allTodos:[]
}

const TodoContext = createContext<UseTodoContextType>(initialContextState)
export const useTodos = ()=>{
    return useContext(TodoContext)
}
export const TodoProvider:React.FC<PropsWithChildren> = ({children})=>{
    return(
        <TodoContext.Provider value={useTodoContext(initialTodoState)}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider
