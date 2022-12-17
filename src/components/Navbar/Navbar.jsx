import React, { useState } from 'react'
import "./navbar.scss"
import { RiFileUploadLine } from 'react-icons/ri'
import UploadForm from '../UploadForm/UploadForm'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <header className='header'>
      <nav>
        <div className="nav-top">
          <img src="/my-unsplash-logo.svg" />
        </div>
        <div className="nav-bottom">
          <SearchBar/>
          <button className="btn-add" onClick={() => setShowModal(!showModal)}>
            <RiFileUploadLine/>
            <span className='text'>Add a photo</span>
          </button>
        </div>
      </nav>
      <UploadForm showModal={showModal} setShowModal={setShowModal} />
    </header>
  )
}

export default Navbar
