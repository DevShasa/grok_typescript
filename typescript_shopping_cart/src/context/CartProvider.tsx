import { useMemo, useReducer, createContext, PropsWithChildren } from "react";

export type CartItemType  = {
    sku:string;
    name:string;
    price:number;
    qty:number
}

type CartStateType = {
    cart:CartItemType[]
}

const initCartState:CartStateType = { cart:[] }

const REDUCER_ACTION_TYPE = {
    ADD:"ADD",
    REMOVE:"REMOVE",
    QUANTITY:"QUANTITY",
    SUBMIT:"SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type:string,
    payload?: CartItemType
}

const cartReducer = (state:CartStateType, action:ReducerAction): CartStateType =>{
    switch(action.type){
        case REDUCER_ACTION_TYPE.ADD:{
            if(!action.payload) throw new Error("Action has no payload")
            const { sku, name , price } = action.payload
            const filteredCart:CartItemType[] = state.cart.filter((item)=>{
                item.sku != sku
            })

            // check if the item exists
            const itemExists: CartItemType | undefined = state.cart.find(item=>item.sku === sku)

            // if it exists increment quantity if it does not exist default quantity to one
            const qty:number = itemExists ? itemExists.qty +1 : 1

            return {...state, cart:[...filteredCart, {sku, name , price, qty}]}
        }
        case REDUCER_ACTION_TYPE.REMOVE:{
            if(!action.payload) throw new Error("Action has no payload")
            const { sku} = action.payload

            // Remove the item from the cart
            const filteredCart:CartItemType[] = state.cart.filter((item)=>{
                item.sku != sku
            })

            return {...state, cart:[...filteredCart]}

        }
        case REDUCER_ACTION_TYPE.QUANTITY:{
            if(!action.payload) throw new Error("Action has no payload")
            const { sku, qty } = action.payload

            // return the item if it exists
            const itemExists: CartItemType | undefined = state.cart.find(item=>item.sku === sku)
            
            if(!itemExists){
                // item does not exist
                throw new Error('Item must exist in order to updateQUANTITY')
            }

            const updatedCartItem:CartItemType = {...itemExists, qty}

            // Remove the item from the cart so we can add the updated
            const filteredCart:CartItemType[] = state.cart.filter((item)=>{
                item.sku != sku
            })

            return { ...state, cart:[...filteredCart, updatedCartItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT:{
            return {...state, cart:[]}
        }
        default:
            throw new Error("Unidentified Reducer Action Type")
    }
}

const useCartContext = (initState:CartStateType) =>{
    // this is a hook that contains all the data we need
    // typeof is used to infer the type of this hook which we use to set up context
    const [ cartState, cartDispatch ] = useReducer(cartReducer, initState)
    const REDUCER_ACTIONS = useMemo(()=>{
        // 
        return REDUCER_ACTION_TYPE
    },[])

    const totalItemsInCart:number = cartState.cart.reduce((previousvalue, cartItem)=>{
        return previousvalue + cartItem.qty
    },0)

    const totalPrice = new Intl.NumberFormat("en-us",{style:"currency", currency:'USD'})
                                .format(cartState.cart.reduce((previousVal, item)=>{
                                    return previousVal + (item.price * item.qty)
                                },0))
    
    const cart = cartState.cart.sort((a,b)=>{
        const itemA:number = Number(a.sku.slice(-4))
        const itemB:number = Number(b.sku.slice(-4))

        return itemA - itemB
    })

    return { cartDispatch, REDUCER_ACTIONS,  totalItemsInCart, totalPrice, cart}
} 

// extract the type definition from the hook
export type UseCartContextType = ReturnType<typeof useCartContext>

// Initial context state
const initialCartContextState:UseCartContextType = {
    cartDispatch:()=>{},
    REDUCER_ACTIONS:REDUCER_ACTION_TYPE,
    totalItemsInCart:0,
    totalPrice:"",
    cart:[]
}

export const CartContext = createContext<UseCartContextType>(initialCartContextState)

export const CartProvider:React.FC<PropsWithChildren> = ({children}) =>{
    return(
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext