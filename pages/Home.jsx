import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import storage from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Likes from "./components/Likes";

// const app = initializeApp(firebaseConfig);

export default function Home() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewURLs, setPreviewURLs] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);

    const imagePreviewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prevURLs) => [...prevURLs, ...imagePreviewURLs]);
    setFile(event.target.files[0]);
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",

      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  const fetchSavedPhotos = async () => {
    const imagesRef = ref(storage, "/files");

    try {
      const imagesSnapshot = await getDocs(imagesRef);
      const imageURLs = [];

      imagesSnapshot.forEach((doc) => {
        const imageURL = getDownloadURL(ref(storage, doc.name));
        imageURLs.push(imageURL);
      });

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
          <div className="images__wrapper">
            <div className="image">
              <img
                key={index}
                src={url}
                alt="Preview"
                className="uploaded__image"
              />
              <Likes percent={percent}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
