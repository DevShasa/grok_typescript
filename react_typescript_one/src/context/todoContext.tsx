import { useState, useContext,createContext } from 'react'
import { Todo } from '../utils/model'


const appTodoContext = createContext({
    todos: [] 
})

const TodoContext = ({children}) =>{
    
}