import { PropsWithChildren } from "react"

//const Box = ({children}:{children:React.ReactNode})=>{
const Box:React.FunctionComponent<PropsWithChildren> = ({children})=>{
    return (
        <div style={{color:"green"}}>
            {children}
        </div>
    )
}
export default Box

