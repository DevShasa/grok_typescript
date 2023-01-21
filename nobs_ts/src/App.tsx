import { useCallback, useState, useEffect, useReducer, useRef} from "react"
import Heading from "./components/Heading";
import List from "./components/List";
import Box from "./components/Box";
import { Payload, Todo, ActionType } from "./utils";


function App() {
  const [ todos, todoDispatch ] = useReducer(todoReducer,[]);
  const [payload, setPayload] = useState<Payload | null>(null)
  const newTodoRef = useRef<HTMLInputElement>(null)


  const onListClick = useCallback((item:string)=>{
    alert(item)
  },[])

  const onAddTodo = useCallback(()=>{
      if(newTodoRef.current){
          todoDispatch({type:"ADD",text:newTodoRef.current.value})
          newTodoRef.current.value = ""
      }
  },[])

  useEffect(()=>{
    fetch("/data.json")
      .then(resp=>resp.json())
      .then(data =>{
        setPayload(data.text)
      })
  },[])


  return (
    <div className="App">
      <Heading title="introduction"/>
      <Box>Hello There</Box>
      <Box>{JSON.stringify(payload)}</Box>
      <List items={["one", "two", "three"]} onClick={onListClick}/>

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

export default App


const todoReducer = (state:Todo[], action:ActionType) =>{
  switch(action.type){
    case "ADD":
      return [...state, {id:state.length, done:false, text:action.text}]
    case "REMOVE":
      return state.filter(({id})=> action.id != id)
    default:
      throw new Error()
  }
}



