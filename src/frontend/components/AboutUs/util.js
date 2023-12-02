// utils.js
export const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncatedDescription = words.slice(0, 10).join(' ') + '...';
    return truncatedDescription;
  };
  