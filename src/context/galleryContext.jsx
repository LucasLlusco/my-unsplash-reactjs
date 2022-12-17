import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { createContext, useContext } from "react";
import { v4 } from "uuid";
import { db, storage } from "../firebase";


const GalleryContext = createContext();

export const GalleryContextProvider = ({children}) => {
    const [images, setImages] = useState([]);
    const [imagesFiltered, setImagesFiltered] = useState([]);

    const uploadFile = async (file) => {
        const fileName = file.name + v4();
        const storageRef = ref(storage, `images/${fileName}`) 
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        const fileUploaded = [url, fileName];
        return fileUploaded
    }

    const uploadFileData = async (label, password, url, fileName) => {
        const docName = v4();
       
        await setDoc(doc(db, "images", docName), {
          label: label,
          password: password,
          url: url,
          fileName: fileName
        })
        const newImage = { 
            label: label,
            password: password,
            url: url,
            fileName: fileName,
            id: docName
        }
        setImages([newImage, ...imagesFiltered]);
        setImagesFiltered([newImage, ...imagesFiltered]);
    }

    const deleteFile = async (fileName, fileId) => {
        const storageRef = ref(storage, `images/${fileName}`);
        await deleteObject(storageRef);
        await deleteDoc(doc(db, "images", fileId));
        const newImages = images.filter(image => image.id !== fileId)
        setImages(newImages);
        setImagesFiltered(newImages);
    } 



    return (
        <GalleryContext.Provider
            value={{uploadFile, 
                uploadFileData, 
                deleteFile,
                images,
                setImages,
                imagesFiltered,
                setImagesFiltered,
            }}
        >
            {children}
        </GalleryContext.Provider>
    )
}

export const useGalleryContext = () => {
    return useContext(GalleryContext);
}