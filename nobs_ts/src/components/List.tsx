
interface ListProps{
    items: string[]; 
    onListClick? :(item:string) =>void
}

// const List:React.FunctionComponent<{items: string[]; onClick? :(item:string) =>void}> = ({items, onClick})=>{
const List:React.FunctionComponent<ListProps> = ({items, onListClick})=>{
    return(
        <ul className="ulist">
            {items.map((item, index)=>(
            <li key={index} onClick={()=>onListClick?.(item)} className="liitem">{item}</li>
            ))}
        </ul>
    )
}

export default List