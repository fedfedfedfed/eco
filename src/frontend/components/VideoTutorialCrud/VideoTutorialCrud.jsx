import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeCrud.css';
import Header from '../Header/Header';

const VideoTutorialCrud = (props) => {
    const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    imageUrl: '',
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/video-tutorials');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/video-tutorials', formData);
      fetchVideos();
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error creating video tutorial:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedVideo) return;

    try {
      const updatedVideo = {
        ...selectedVideo,
        ...formData,
      };

      await axios.put(
        `http://localhost:8080/api/video-tutorials`,
        updatedVideo
      );

      fetchVideos();
      closeModal();
    } catch (error) {
      console.error('Error updating video tutorial:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/video-tutorials/${id}`);
      fetchVideos();
      setSelectedVideo(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting video tutorial:', error);
    }
  };

  const handleSeeMore = (video) => {
    setSelectedVideo(video);
    setFormData(video);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      imageUrl: '',
    });
    document.body.classList.remove('modal-open');
  };
  return (
    <div className='wrapper'>
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipes-title'>Video Tutorials</h1>
          </div>
          <Link to="/manage-video-tutorials/add-video-tutorials" className="add">
            <span>+</span>
          </Link>
  
          
        </div>
  
        <ul className='recipe_wrapper'>
          {videos.map((video) => (
            <li key={video.id} className="recipe-card">
              <div className="recipe-details">
              <img src={video.imageUrl} alt={video.title} className="video-image recipe-image" />
                <h3 className="recipe_title">{video.title}</h3>
                <p className='recipe-description'>{video.description}</p>
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(video);
                  }}
                  href={`#video-modal-${video.id}`}
                >
                  Explore More
                </a>
              </div>
            </li>
          ))}
        </ul>

        {selectedVideo && (
          <div id={`video-modal-${selectedVideo.id}`} className="modal">
            <div className="modal__content">
              <a className="video-placeholder-wrapper" target='_blank' href={selectedVideo.videoUrl}>
              <img
                src={selectedVideo.imageUrl}
                alt={selectedVideo.title}
                className="modal-image"
              />
              <svg className="video-placeholder" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
<path d="M35.6883 10.165C35.5002 9.41361 35.1172 8.72511 34.5778 8.1691C34.0385 7.61309 33.362 7.20925 32.6166 6.99837C29.8933 6.33337 19 6.33337 19 6.33337C19 6.33337 8.10663 6.33337 5.3833 7.06171C4.63794 7.27258 3.96143 7.67642 3.4221 8.23243C2.88277 8.78845 2.49972 9.47694 2.31164 10.2284C1.81323 12.9922 1.56943 15.7959 1.5833 18.6042C1.56554 21.4337 1.80935 24.2588 2.31164 27.0434C2.51899 27.7715 2.91062 28.4338 3.4487 28.9663C3.98677 29.4988 4.6531 29.8836 5.3833 30.0834C8.10663 30.8117 19 30.8117 19 30.8117C19 30.8117 29.8933 30.8117 32.6166 30.0834C33.362 29.8725 34.0385 29.4687 34.5778 28.9127C35.1172 28.3566 35.5002 27.6681 35.6883 26.9167C36.1829 24.1737 36.4266 21.3914 36.4166 18.6042C36.4344 15.7747 36.1906 12.9496 35.6883 10.165Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.4375 23.7816L24.5417 18.6041L15.4375 13.4266V23.7816Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </a>
              <h2 className='modal_video_title'>{selectedVideo.title}</h2>
              
              <p className='modal_description'>{selectedVideo.description}</p>

              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
              <div className="crud_btns">
                <Link to={`/manage-video-tutorials/update-video-tutorials/${selectedVideo.id}`} className="update">
                  <button type="button" className='update-btn' onClick={handleUpdate}>
                    Update
                  </button>
                </Link>
                <button type="button" className='delete-btn' onClick={() => handleDelete(selectedVideo.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default VideoTutorialCrud;