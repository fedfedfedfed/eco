import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const BlogAbout = (props) => {
    const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    createdBy: 'Admin',
    commentsAmount: 0,
    imageUrl: '',
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/blogs');
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
      await axios.post('http://localhost:8080/api/blogs', formData);
      fetchVideos();
      setFormData({
        title: '',
    description: '',
    tag: '',
    createdBy: 'Admin',
    commentsAmount: 0,
    imageUrl: '',
      });
    } catch (error) {
      console.error('Error creating blog:', error);
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
        `http://localhost:8080/api/blogs`,
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
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
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
    tag: '',
    createdBy: 'Admin',
    commentsAmount: 0,
    imageUrl: '',
    });
    document.body.classList.remove('modal-open');
  };
  return (
    <div className='wrapper'>  
              <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className="recipes-title">Blogs</h1>
          </div>
        </div>
        <div className="wrap">

        <ul className='recipe_wrapper'>
          {videos.map((video) => (
            <li key={video.id} className="recipe-card">
              <div className="recipe-details">
              <img src={video.imageUrl} alt={video.title} className="video-image recipe-image" />
                <h3 className="recipe_title">{video.title}</h3>
                <p className='recipe-description'>{video.description}</p>
                <a
                  className="see-more-blog"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(video);
                  }}
                  href={`#video-modal-${video.id}`}
                >
                  Read More
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
              </a>
              <h2 className='modal_video_title'>{selectedVideo.title}</h2>
              <div className='blog-flex'>
              <p className='modal_description'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
<path d="M17.1584 11.6748L11.1834 17.6498C11.0286 17.8048 10.8448 17.9277 10.6424 18.0116C10.4401 18.0955 10.2232 18.1386 10.0042 18.1386C9.78516 18.1386 9.56828 18.0955 9.36595 18.0116C9.16362 17.9277 8.97981 17.8048 8.82502 17.6498L1.66669 10.4998V2.1665H10L17.1584 9.32484C17.4688 9.63711 17.643 10.0595 17.643 10.4998C17.643 10.9401 17.4688 11.3626 17.1584 11.6748V11.6748Z" stroke="#B3B3B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83337 6.33301H5.84171" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                {selectedVideo.tag}
                
                </p>
              <p className='modal_description'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
<path d="M9.9999 9.66667C11.8408 9.66667 13.3332 8.17428 13.3332 6.33333C13.3332 4.49238 11.8408 3 9.9999 3C8.15895 3 6.66656 4.49238 6.66656 6.33333C6.66656 8.17428 8.15895 9.66667 9.9999 9.66667Z" stroke="#B3B3B3" stroke-width="1.2"/>
<path d="M12.4999 12.1665H7.49995C5.19828 12.1665 3.13745 14.2915 4.65161 16.024C5.68161 17.2023 7.38495 17.9998 9.99995 17.9998C12.6149 17.9998 14.3174 17.2023 15.3474 16.024C16.8624 14.2907 14.8008 12.1665 12.4999 12.1665Z" stroke="#B3B3B3" stroke-width="1.2"/>
</svg>
                {selectedVideo.createdBy}
                
                </p>
              <p className='modal_description'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
<path d="M10.5238 14.2728L9.48206 16.0087C9.43209 16.092 9.36139 16.1609 9.27687 16.2088C9.19234 16.2566 9.09686 16.2818 8.99972 16.2818C8.90258 16.2818 8.8071 16.2566 8.72257 16.2088C8.63804 16.1609 8.56735 16.092 8.51738 16.0087L7.47675 14.2728C7.42671 14.1895 7.35596 14.1206 7.27138 14.0728C7.1868 14.025 7.09128 13.9999 6.99413 14H2.8125C2.66332 14 2.52024 13.9407 2.41475 13.8352C2.30926 13.7298 2.25 13.5867 2.25 13.4375V4.4375C2.25 4.28832 2.30926 4.14524 2.41475 4.03975C2.52024 3.93426 2.66332 3.875 2.8125 3.875H15.1875C15.3367 3.875 15.4798 3.93426 15.5852 4.03975C15.6907 4.14524 15.75 4.28832 15.75 4.4375V13.4375C15.75 13.5867 15.6907 13.7298 15.5852 13.8352C15.4798 13.9407 15.3367 14 15.1875 14H11.0059C10.9088 14 10.8134 14.0252 10.7289 14.073C10.6445 14.1208 10.5738 14.1896 10.5238 14.2728V14.2728Z" stroke="#B3B3B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                {selectedVideo.commentsAmount}
                </p>
                </div>
              <p className='modal_description'>{selectedVideo.description}</p>
              


              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
             
            </div>
          </div>
        )}
        </div>
        </div>
    </div>
  );
  
};

export default BlogAbout;