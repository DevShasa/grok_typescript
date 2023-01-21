
interface ListProps{
    items: string[]; 
    onClick? :(item:string) =>void
}

// const List:React.FunctionComponent<{items: string[]; onClick? :(item:string) =>void}> = ({items, onClick})=>{
const List:React.FunctionComponent<ListProps> = ({items, onClick})=>{
    return(
        <ul>
            {items.map((item, index)=>(
            <li key={index} onClick={()=>onClick?.(item)}>{item}</li>
            ))}
        </ul>
    )
}

export default List