import React, { useState } from 'react';

function UploadBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    // Read the existing JSON file
    fetch('/blogs.json')
      .then((response) => response.json())
      .then((data) => {
        // Add the new blog data
        data.blogs.push({
          title,
          description,
          image: image.name, // Store the image file name
        });

        // Write the updated data back to the JSON file
        fetch('/blogs.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            alert('Blog uploaded successfully.');
          })
          .catch((error) => {
            console.error('Error uploading blog:', error);
          });
      });
  };

  return (
    <div>
      <h2>Upload a Blog</h2>
      <label>Title:</label>
      <input type="text" onChange={handleTitleChange} value={title} />

      <label>Description:</label>
      <textarea onChange={handleDescriptionChange} value={description} />

      <label>Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleUpload}>Upload Blog</button>
    </div>
  );
}

export default UploadBlog;