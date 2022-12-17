import React, { useState } from 'react'
import DeleteForm from '../DeleteForm/DeleteForm';
import "./itemCard.scss"
import { motion } from 'framer-motion'

const ItemDetail = ({item}) => {
  const [showModal, setShowModal] = useState(false);
  const [imageHeight, setImageHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  let image = new Image();
  image.src = item.url 

  image.onload = function() { 
    if(this.width >= 1200 && this.width > this.height) {
      setImageWidth("item-grid-col-2")              
    } 
    if(this.height >= 600 && this.height > this.width) {
      setImageHeight("item-grid-row-2")      
    }
  }

  return (
    <>
    <motion.div className={`item-card ${imageWidth} ${imageHeight}`} layout>
      <img src={item.url} alt={item.label} loading="lazy" />
      <button onClick={() => setShowModal(!showModal)}>delete</button>
      <h4>{item.label}</h4>
    </motion.div>
    <DeleteForm 
      showModal={showModal} 
      setShowModal={setShowModal} 
      filePassword={item.password}
      fileName={item.fileName} 
      fileId={item.id}/>
    </>
  )
}

export default ItemDetail
