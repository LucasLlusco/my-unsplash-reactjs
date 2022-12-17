import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useGalleryContext } from '../../context/galleryContext';
import { db } from '../../firebase';
import ItemList from '../ItemList/ItemList';
import { BiLoaderAlt } from 'react-icons/bi';
import "./itemListContainer.scss"


const ItemListContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {images, setImages, imagesFiltered, setImagesFiltered} = useGalleryContext()

    const getImagesDocs = async () => {
      setIsLoading(true);
      try {
        const imagesRef = collection(db, "images");
        const images = await getDocs(imagesRef);
        const docs = images.docs
        const list = docs.map((element) => {
          const id = element.id; 
          const image = {
            id,
            ...element.data()
          }
          return image
        })
        setImages(list); 
        setImagesFiltered(list); 
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
  
    useEffect(() => {

      getImagesDocs()
    }, [])
  return (
    <main className='item-list-container'>
      {isLoading ? (
        <div className="loader">
          <BiLoaderAlt/>
        </div>
      ) : (
        error ? (
          <p className='error'>{error}</p>
        ) : (
          <ItemList items={imagesFiltered} />          
        )
      )}
    </main>
  )
}

export default ItemListContainer
