import { useEffect, useState } from "react"


export const ItemListContainer = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const getItems = async () => {
    const response = await fetch('http://localhost:8080/api/products')
    const data = await response.json()
    console.log(data)
    setItems(data.products.docs)
    setLoading(false)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h2>Listado de productos</h2>
          {items.map((item) => (
            <div key={item.id} className="p-2">
             <div  className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">{item.price}</p>
              </div>
            </div>
            </div>
          ))}
        </>
        
      )}
    </div>
  )
}
