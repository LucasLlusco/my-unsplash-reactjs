import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import "./deleteForm.scss"
import { useGalleryContext } from '../../context/galleryContext';
import { motion } from 'framer-motion';

const DeleteForm = ({showModal, setShowModal, filePassword, fileName, fileId}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {deleteFile} = useGalleryContext();

    const deleteImage = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        setError("");
        try {
            if(password) {
                if(password === filePassword) {
                    await deleteFile(fileName, fileId);
                } else {
                    throw new Error("wrong password")
                }
            } else {
                throw new Error("please, complete the form.")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }       
    }
  return (
    <>
    {showModal && 
    <div className="delete-modal" >
        <motion.div className="modal-wrapper" 
        initial={{ y: "-20vh" }}
        animate={{ y: 0 }}>
            <form className="delete-form"  onSubmit={deleteImage}>
                <h3 className="form-title">Are you sure?</h3>
                {error && <p className='form-error'>{error}</p>}
                <div className="form-input">
                    <label className="label" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="****************"
                        id="password" 
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                    /> 
                </div>
                <div className="btn-container">
                    <button type='button' className='btn-close' onClick={() => setShowModal(!showModal)}>Cancel</button>
                    <button type='submit' className='btn-delete' disabled={isLoading}>
                        {isLoading && <BiLoaderAlt/>}
                        Delete
                    </button>
                </div>
            </form>
        </motion.div>
    </div>
    }
    </>
  )
}

export default DeleteForm
