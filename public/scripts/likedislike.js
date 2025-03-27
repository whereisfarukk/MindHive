window.onload = function () {
  const likebtn = document.getElementById("likeBtn");

  const dislikebtn = document.getElementById("dislikebtn");
  likebtn.addEventListener("click", function (e) {
    const postId = e.target.getAttribute("data-post-id");
    console.log(postId);
    reqLikeDislike("likes", postId)
      .then((res) => res.json())
      .then((data) => {
        let likeText = data.liked ? "Liked" : "Like";
        likeText = likeText + `(${data.totalLikes})`;
        let dislikeText = `Dislike (${data.totalDislikes})`;
        likebtn.innerHTML = likeText;
        dislikebtn.innerHTML = dislikeText;
      })
      .catch((e) => {
        console.log(e);
      });
  });
  dislikebtn.addEventListener("click", function (e) {
    const postId = e.target.getAttribute("data-post-id");
    console.log(postId);
    reqLikeDislike("dislikes", postId)
      .then((res) => res.json())
      .then((data) => {
        let dislikeText = data.dislikebtn ? "Disliked" : "Dislike";
        dislikeText = dislikeText + `(${data.totalDislikes})`;
        let likeText = `Like (${data.totalLikes})`;
        dislikebtn.innerHTML = dislikeText;

        likebtn.innerHTML = likeText;
        dislikebtn.innerHTML = dislikeText;
      })
      .catch((e) => {
        console.log(e);
      });
  });
  function reqLikeDislike(type, postId) {
    let headers = new Headers();
    headers.append("Content-Type", "Application/JSON");

    let req = new Request(`/api/${type}/${postId}`, {
      method: "POST",
      headers,
      mode: "cors",
    });
    return fetch(req);
  }
};
