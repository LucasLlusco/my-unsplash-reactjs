import React, { useRef, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import "./uploadForm.scss"
import { useGalleryContext } from '../../context/galleryContext';
import { motion } from 'framer-motion';
const UploadForm = ({showModal, setShowModal}) => {
    const dropzoneRef = useRef(null); 
    const inputFileRef = useRef(null); 
    
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [label, setLabel] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("");

    const {uploadFile, uploadFileData } = useGalleryContext();

    const handleFileInput = (e) => {
        const newFile = e.target.files[0]; 
        if(newFile) { 
            if (newFile.type.includes("image")) {
                setFile(newFile)
            } 
        } 
    }
    const onDragEnter = () =>  dropzoneRef.current.classList.add('dragover');
    const onDragLeave = () =>  dropzoneRef.current.classList.remove('dragover');
    const onDrop = () =>  dropzoneRef.current.classList.remove('dragover');
    const onClickDropzone = (e) => e.preventDefault(); 

    const uploadImage = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        setError("");
        try {
            if(label && password && file) { 
                const fileUploaded = await uploadFile(file); 
                await uploadFileData(label, password, fileUploaded[0], fileUploaded[1]); 
                setLabel("");
                setPassword("");
                setFile("");
                setShowModal(false);
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
    <div className="upload-modal">        
        <motion.div className="modal-wrapper" initial={{ y: "-20vh" }}
        animate={{ y: 0 }}>        
            <form className='upload-form' onSubmit={uploadImage}>
                <h3 className="form-title">Add a new photo</h3>
                {error && <p className='form-error'>{error}</p>}
                <div className="form-input">
                    <label className="label" htmlFor="label">Label</label>
                    <input 
                        type="text" 
                        placeholder="Suspendisse elit massa"
                        id="label" 
                        className="input"
                        onChange={(e) => setLabel(e.target.value)}
                    /> 
                </div>
                <div className="form-input">
                    <label className="label" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Key"
                        id="password" 
                        className="input"
                        onChange={(e) => setPassword(e.target.value)} 
                    /> 
                </div>
                <div className="dropzone" 
                    ref={dropzoneRef}
                    onDragEnter={onDragEnter} 
                    onDragLeave={onDragLeave} 
                    onDrop={onDrop}>
                    <input 
                        type="file" 
                        accept='image/*' 
                        onChange={handleFileInput} 
                        onClick={onClickDropzone} 
                    />
                    <img src="/upload-image.svg" alt="upload-bg" />
                    <p>Drag & Drop your image here</p>
                </div>
                <span className='spacing'>Or</span>
                    <input 
                    type="file" 
                    accept='image/*' 
                    ref={inputFileRef} 
                    onChange={handleFileInput} 
                    className="input-file"  />
                    <button type='button' className='btn-file' onClick={() => inputFileRef.current.click()}>Choose a file</button>
                <div className="btn-container">
                    <button type='button' className='btn-close' onClick={() => setShowModal(!showModal)}>Cancel</button>
                    <button type='submit' className='btn-submit' disabled={isLoading}>
                        {isLoading && <BiLoaderAlt/>}
                        Submit
                    </button>
                </div>
            </form>
        </motion.div>
    </div>}
    </>

  )
}

export default UploadForm