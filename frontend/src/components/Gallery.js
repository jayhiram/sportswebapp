import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCamera, faDownload } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import '../styles/Gallery.css';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();

    const role = localStorage.getItem('userRole');
    setUserRole(role || '');
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setIsPosting(true);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caption', caption);

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPosts([response.data, ...posts]);

      setSelectedFile(null);
      setCaption('');
      setIsPosting(false);
    } catch (error) {
      console.error('Error uploading post:', error);
      setIsPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/like`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1, liked: true } : post
        )
      );
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'image_or_video');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp) => {
    return moment(timestamp).format('MMMM D, YYYY h:mm A');
  };

  return (
    <div className="gallery">
      <div className="header">
        <h2>Kilifi Sport Hub Gallery</h2>
        {userRole === 'admin' && (
          <div className="upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
              <FontAwesomeIcon icon={faCamera} /> Upload Photo/Video
              <input id="file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
            {selectedFile && (
              <div>
                <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="selected-file-preview" />
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." />
                <button onClick={handleUpload}>{isPosting ? 'Posting...' : 'Post'}</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="gallery-container">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="user-info">
              <span className="full-name">Kilifi Sports</span>
              <div className="date-info">
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>

            {post.caption && <h3>{post.caption}</h3>}


            <div className="post-meta">
              {post.type === 'image' && (
                <>
                  <img src={post.url} alt="" />
                </>
              )}
              {post.type === 'video' && (
                <>
                  <video controls>
                    <source src={post.url} type="video/mp4" />
                  </video>
                </>
              )}
            </div>

            <div className="reactions">
              <button disabled={post.liked} onClick={() => handleLike(post.id)}>
                <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
              </button>
              <button onClick={() => handleDownload(post.url)}>
                <FontAwesomeIcon icon={faDownload} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
