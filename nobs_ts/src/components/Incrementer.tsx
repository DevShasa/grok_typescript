import React from 'react'

interface incrementProps{
    value:number;
    setValue: React.Dispatch<React.SetStateAction<number>>
}

const Incrementer:React.FC<incrementProps> = ({value, setValue}) => {
    return (
        <button onClick = {()=>setValue(value + 1)}>
            Add - {value}
        </button>
    )
}

export default Incrementer