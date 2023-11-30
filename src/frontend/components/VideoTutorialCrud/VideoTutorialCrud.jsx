import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeCrud.css';
import Header from '../Header/Header';

const VideoTutorialCrud = () => {
  const [videos, setVideos] = useState([ {
    id: 1,
    title: 'Video 1',
    description: 'Description for Video 1',
    videoUrl: 'https://www.youtube.com/embed/mG4NLNZ37y4?si=VPugg6mXknQuEDKf',
  },
  {
    id: 2,
    title: 'Video 2',
    description: 'Description for Video 2',
    videoUrl: 'https://www.youtube.com/embed/fGuKrPMjYXw?si=R2d6T5kDJq7AytQ_',
  },
  {
    id: 3,
    title: 'Video 3',
    description: 'Description for Video 3',
    videoUrl: 'https://www.youtube.com/embed/b9eMGE7QtTk?si=A7x7NmMBl8rhKR2e',
  },]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
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
        `http://localhost:8080/api/video-tutorials/${selectedVideo.id}`,
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
    });
    document.body.classList.remove('modal-open');
  };
  return (
    <div className='wrapper'>
      <Header />
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipes-title'>Відеоуроки</h1>
          </div>
          <Link to="/manage-video-tutorials/add-video-tutorials" className="add">
            <span>+</span>
          </Link>
  
          <div id="open-modal" className="modal-window">
            <div>
              <a href="#" title="Закрити" className="modal-close">&#10006;</a>
              <form className="recipe-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Назва:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="description">Опис:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="videoUrl">Посилання на відео:</label>
                  <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
  
                <button className='add_btn' type="submit">Додати відеоурок</button>
              </form>
            </div>
          </div>
        </div>
  
        <ul className='recipe_wrapper'>
        {videos.map((video) => (
  <li key={video.id} className="recipe-card">
    <div className="recipe-details">
      <h3 className="recipe_title">{video.title}</h3>
      <p className='recipe-description'>{video.description}</p>
      <div className="video-container">
        <iframe
          title={video.title}
          src={video.videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <a
        className="see-more"
        onClick={(e) => {
          e.stopPropagation();
          handleSeeMore(video);
        }}
        href={`#video-modal-${video.id}`}
      >
        Дивитися урок
      </a>
    </div>
  </li>
))}

        </ul>
  
        {selectedVideo && (
          <div id={`video-modal-${selectedVideo.id}`} className="modal">
            <div className="modal__content">
              <h2 className='modal_title'>{selectedVideo.title}</h2>
              <iframe
                title={selectedVideo.title}
                src="https://www.youtube.com/watch?v=b9eMGE7QtTk&ab_channel=JavaScriptMastery"
                className="modal-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className='modal_description'>{selectedVideo.description}</p>
  
              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
              <div className="crud_btns">
                <Link to={`/manage-video-tutorials/update-video-tutorials/${selectedVideo.id}`} className="update">
                  <button type="button" className='update-btn' onClick={handleUpdate}>
                    Оновити
                  </button>
                </Link>
                <button type="button" className='delete-btn' onClick={() => handleDelete(selectedVideo.id)}>
                  Видалити
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
