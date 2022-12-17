import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import "./itemList.scss"

const ItemList = ({items}) => {
  return (
    <section className='item-list'>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
    </section>
  )
}

export default ItemList