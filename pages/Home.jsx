import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import {storage} from "@/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { getDocs } from "firebase/firestore";
import Likes from "./components/Likes";

// const app = initializeApp(firebaseConfig);

export default function Home() {
  const [likes, setLikes] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const storage = getStorage();

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);

    const imagePreviewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prevURLs) => [...prevURLs, ...imagePreviewURLs]);

    try {
      for (const file of files) {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(downloadURL);
        // Save the download URL to your database or perform any other actions

        // Initialize the likes count for the uploaded photo to 0
        setLikes((prevLikes) => ({
          ...prevLikes,
          [downloadURL]: 0
        }));
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleLike = (url) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [url]: prevLikes[url] + 1
    }));
  };

  const fetchSavedPhotos = async () => {
    try {
      const imagesRef = ref(storage, "/files");
      const imagesSnapshot = await listAll(imagesRef);
      const imageURLs = [];

      for (const imageRef of imagesSnapshot.items) {
        const imageURL = await getDownloadURL(imageRef);
        imageURLs.push(imageURL);
      }

      setPreviewURLs(imageURLs);
    } catch (error) {
      console.log("Error fetching image URLs:", error);
    }
  };

  useEffect(() => {
    fetchSavedPhotos();
  }, []);

  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <div>
        <div className="label__wrapper">
          <label htmlFor="upload" className="custom-file-upload">
            Upload image
          </label>
        </div>
        <input type="file" id="upload" multiple onChange={handleImageUpload} />
        {previewURLs.map((url, index) => (
          <div className="images__wrapper" key={index}>
            <div className="image">
              <img
                key={index}
                src={url}
                alt="Preview"
                className="uploaded__image"
              />
              <Likes  count={likes[url]} onLike={() => handleLike(url)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
