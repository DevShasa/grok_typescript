import InputField from "./components/InputField"
import { useState } from "react"
import TodoList from "./components/TodoList"
import { useTodos } from "./context/todoContext"

const App:React.FC = ()=>{

  const { REDUCER_ACTIONS, todoDispatch} = useTodos()
  const [ todo, setTodo ] = useState<string>("")

  const handleAdd = (e: React.FormEvent) =>{
    e.preventDefault();
    if(todo){
      todoDispatch({
        type: REDUCER_ACTIONS.ADD,
        payload:{id:Date.now(), todo, isDone:false}
      })
      setTodo("")
    }
  }
  return(
    <div className="App">
        <span className="heading">
          Taskify
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList/>
    </div>
  )
}
export default App