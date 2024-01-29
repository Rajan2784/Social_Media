export const isLikedByReqUser = (reqUserId, post) => {
    // Ensure that post.liked is an array before attempting to iterate over it
    if (Array.isArray(post.liked)) {
      // Check if the reqUserId is in the liked array
      return post.liked.some((user) => user.id === reqUserId);
    }
  
    return false;
  };
  