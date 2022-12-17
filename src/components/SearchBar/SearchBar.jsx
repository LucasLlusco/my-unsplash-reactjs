import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useGalleryContext } from '../../context/galleryContext'
import "./searchBar.scss"

const SearchBar = () => {
  const {images, setImagesFiltered } = useGalleryContext();

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    if(searchWord.length === 0) {
      setImagesFiltered(images); 
    }
    if(searchWord.length > 2) {
      const filtered = images.filter((item) => item.label.toLowerCase().includes(searchWord));
      setImagesFiltered(filtered);
    } 
  }

  return (
    <div className='search-bar'>
        <AiOutlineSearch/>
        <input type="text" placeholder='Search by name' onChange={handleFilter} />
    </div>
  )
}

export default SearchBar