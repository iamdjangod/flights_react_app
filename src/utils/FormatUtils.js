export const formatDate = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  export const formatDuration = (duration) => {
    return Math.floor(duration / 60) + " hrs " + duration % 60 + " mins";
  };