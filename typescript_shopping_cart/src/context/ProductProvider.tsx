import { createContext, ReactElement, useState, useEffect } from "react"

export type ProductType = {
    sku:string
    name:string
    price:number
}
export type UseProductsContextType = {
    products:ProductType[]
}
type reactChildren = {
    children?:ReactElement |  ReactElement[]
}

const initState:ProductType[] = []
const initContextState:UseProductsContextType = {products:[]}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

export const ProductsProvider = ({children}:reactChildren):ReactElement =>{
    const [products, setProducts] = useState<ProductType[]>(initState   )

    useEffect(()=>{
        // function that returns a promise
        const fetchProducts = async ():Promise<ProductType[]> =>{
            const data = await fetch("http://localhost:3500/products")
                                    .then(res=>res.json())
                                    .catch(err =>{
                                        if(err instanceof Error) console.log(err.message)
                                    })
                                    
            return data
        }

        fetchProducts().then(products => setProducts(products))

    },[])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}