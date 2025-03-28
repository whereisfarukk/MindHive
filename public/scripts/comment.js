document.addEventListener("DOMContentLoaded", function () {
  //   const form = document.getElementById("commentForm");
  const commentBtn = document.getElementById("commentBtn");
  const commentInput = document.getElementById("commentInput");

  commentBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const comment = commentInput.value.trim(); // Get the comment text
    const postId = e.target.getAttribute("data-post-id");
    console.log(postId);

    // const formData = new FormData(form);
    // const comment = formData.get("comment");
    // const postId = form
    //   .querySelector('input[name="comment"]')
    //   .getAttribute("data-post");

    let data = {
      body: comment,
    };
    if (comment) {
      generateRequest(`/api/comments/${postId}`, "POST", data)
        .then((res) => res.json())
        .then((data) => {
          const comment = data.commentJSON;
          commentInput.value = "";

          // Dynamically add the new comment to the DOM
          const commentsList = document.getElementById("comments-list");
          if (!commentsList) {
            throw new Error("Comments list not found in the DOM.");
          }

          // Create a new <li> element for the comment
          const newComment = document.createElement("li");
          newComment.innerHTML = `
        <strong>${data.commentJSON.user.name}:</strong>
        ${data.commentJSON.body}
      `;

          // Check if there's a "No comments yet" message and remove it
          if (
            commentsList.children.length === 1 &&
            commentsList.children[0].textContent.includes("No comments yet")
          ) {
            commentsList.removeChild(commentsList.children[0]);
          }

          // Append the new comment to the list
          commentsList.appendChild(newComment);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("please enter a comment");
    }

    console.log(comment, postId);
  });
});

function generateRequest(url, method, body) {
  let headers = new Headers();
  headers.append("Accept", "Application/JSON");
  headers.append("Content-Type", "Application/JSON");
  let req = new Request(url, {
    method,
    headers,
    body: JSON.stringify(body),
    mode: "cors",
  });
  return fetch(req);
}
