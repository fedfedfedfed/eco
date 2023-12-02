import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';


const VideoTutorialCrud = () => {
    const [videos, setVideos] = useState([
        {
          id: 1,
          title: 'Video 1',
          description: 'Description for Video 1',
          videoUrl: 'https://imgur.com/Gqnou9J',
        },
        {
          id: 2,
          title: 'Video 2',
          description: 'Description for Video 2',
          videoUrl: 'https://imgur.com/Gqnou9J',
        },
        {
          id: 3,
          title: 'Video 3',
          description: 'Description for Video 3',
          videoUrl: 'https://imgur.com/Gqnou9J',
        },
      ]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow next" onClick={onClick}><i className="fas fa-chevron-right"></i></div>;
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow prev" onClick={onClick}><i className="fas fa-chevron-left"></i></div>;
  };


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Adjust the number of slides to show
    slidesToScroll: 1,
  };

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
    <div className="wrapper">
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className="recipes-title">Video Tutorials</h1>
          </div>

          <div id="open-modal" className="modal-window">
            {/* ... (existing code) */}
          </div>
        </div>

        {/* Replace your existing list with the Slider component */}
        <Slider {...sliderSettings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
          {videos.map((video) => (
            <div className="header_wrapper">
            <div key={video.id} className="recipe-card">
              <div className="recipe-details">
                <h3 className="recipe_title">{video.title}</h3>
                <p className="recipe-description">{video.description}</p>
                <img src={video.videoUrl} alt={video.title} className="video-image" />
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(video);
                  }}
                  href={`#video-modal-${video.id}`}
                >
                  Watch Tutorial
                </a>
              </div>
            </div>
            </div>
          ))}
        </Slider>

        {selectedVideo && (
          <div id={`video-modal-${selectedVideo.id}`} className="modal">
            <div className="modal__content">
              <h2 className="modal_title">{selectedVideo.title}</h2>
              <img
                src={selectedVideo.videoUrl}
                alt={selectedVideo.title}
                className="modal-video"
              />
              <p className="modal_description">{selectedVideo.description}</p>

              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default VideoTutorialCrud;
