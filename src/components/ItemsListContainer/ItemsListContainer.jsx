import { useEffect,useState} from "react"
import styles from "../ItemsListContainer/itemsListContainer.modules.css"
import { addProducts } from "../../exhaustsMock"
import ItemsMap from "../ItemsMap/ItemsMap"
import { useParams } from "react-router-dom"


const ItemsListContainer = () => {
    
    const {category} = useParams();

    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);


    useEffect(()=>{
        setloading(true)
        addProducts()
            .then((response) => {
                if (category) {
                    const productsFilter = response.filter((response) => response.category === category)
                    setproducts(productsFilter)
                    setloading(false)
                }else{
                    setloading(false)
                    setproducts(response)
                }
            })
            .catch((error) => console.log(error))    
    },[category])

    return (
        <>
            <ItemsMap products={products} loading={loading}/>
        </> 
    )
}

export default ItemsListContainer