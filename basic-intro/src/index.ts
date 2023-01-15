// basic types in typescript 
let id: number = 5
let company: string = "Microsoft"
let isPublished: boolean = true
let x:any = "hello"

let ids: number[] = [1,3,4,5,]

ids.push(3) // ok
ids.push("five") // problamativ

let anyArr: any[] = [1, true, "hello"] // can contain anything

//TUPLE
let person:[number, string, boolean] = [1, "Shasa", true,]
//tuple array
let employee: [number,string][]
employee = [
    [1, "shasa"],
    [2, "Thuo"],
    ["thuo","Shasa"] // problematic
]

//UNION
let mutiId: string|number 
mutiId= 22
mutiId = "string"


// ENUMERATED TYPES
enum Direction1{
    Up,
    Down, 
    Left, 
    Right
    // default values are 0,1,2,4 ... if Up is assigned a value of 2 the rest will be 3,4,5
}
console.log("Value of enum Up is",Direction1.Up) // should be zero 

// OBJECTS
type User =  { 
    id: number,
    name: string
}

const user:User = {
    id: 4,
    name:"MyName"
}

// Type Assertion -> explicitly tell the compiler that we want to treat an entity as a different type 
let cid:any = 1
let customerId = <number>cid
customerId = "1345" // generates error
customerId = 344


// FUNCTIONS 
function addNum(x:number, y:number):number{
    return x + y
}

addNum("d",4) // error

// functions without a return value
function logMe(message: string | number):void{
    console.log(message)
}

// INTERFACES, kind of like object types
interface UserInterface{
    user:number
    name:string
    age?: number // this is optional
    readonly govId: string | number
}

const myUser:UserInterface = {
    user:1,
    name:"Shasa",
    govId: "34FF3"
}

myUser.govId = "nine" // error readonly property

//function interfaces also exist
interface MathFunction{
    (x:number, y:number):number
}

const add:MathFunction = (x:number, y:number):number => x + y
const sub:MathFunction = (x:number, y:number):number => x - y


// GENERICS
function getArray<T>(items:T[]) :T[]{
    return new Array().concat(items)
}

const numArray  = getArray<number>([1,3,4,5])
const strArray = getArray<string>(["one", "two", "three", "four"])
numArray.push(6)
numArray.push("five") // error
