import { useCallback, useState, useEffect} from "react"
import Heading from "./components/Heading";
import List from "./components/List";
import Box from "./components/Box";
import { Payload} from "./utils";
import TodoComponent from "./components/Todo";
import Incrementer from "./components/Incrementer";
import TodoContext from "./Context/TodoContext";

function App() {
  
  const [payload, setPayload] = useState<Payload | null>(null)
  const [value, setValue] = useState<number>(0)
  const onListClick = useCallback((item:string)=>{
    alert(item)
  },[])



  useEffect(()=>{
    // fetch data and place it in the app 
    fetch("/data.json")
      .then(resp=>resp.json())
      .then(data =>{
        setPayload({text:data.text, exampleNum:1})
        console.log("PAYLOAD", payload)
      })
  },[])

  return (
    <div className="App">
      <Heading title="introduction"/>
      <Box>Hello There</Box>
      <Box>{payload?.text}</Box>
      <Incrementer {...{value, setValue}}/>
      <List items={["one", "two", "three"]} onListClick={onListClick}/>
      
      <TodoContext>
        <TodoComponent />
      </TodoContext>
        
    </div>
  )
}
export default App





