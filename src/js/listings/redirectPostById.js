export function redirectPostById(event) {
    event.preventDefault();
    const postId = event.target.id;
    const postDetailsURL = `/listings/index.html?id=${postId}`;
    window.location.href = postDetailsURL;
  }