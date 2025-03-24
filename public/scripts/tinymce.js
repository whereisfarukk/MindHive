window.onload = function () {
  tinymce.init({
    selector: "textarea#body",
    plugins: [
      // Core editing features
      "anchor",
      "autolink",
      "charmap",
      "codesample",
      "emoticons",
      "image",
      "link",
      "lists",
      "media",
      "searchreplace",
      "table",
      "visualblocks",
      "wordcount",
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Apr 3, 2025:
    ],
    toolbar:
      "bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview",
    automatic_uploads: true,
    images_upload_url: "/uploads/postimage",
    images_upload_handler: function (blobInfo, success, failure) {
      let formData = new FormData();
      formData.append("post-image", blobInfo.blob(), blobInfo.filename());

      fetch("/uploads/postimage", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (typeof success === "function" && data.imgUrl) {
            success(data.imgUrl); // Call success callback
          } else if (typeof failure === "function") {
            failure("Upload failed"); // Call failure callback
          }
        })
        .catch((error) => {
          console.error("Image Upload Error:", error);
          if (typeof failure === "function") {
            failure("HTTP Error"); // Call failure callback
          }
        });
    },
  });
  // const form = document.querySelector("form");
  // form.addEventListener("submit", function () {
  //   tinymce.triggerSave(); // Updates the hidden textarea with TinyMCE content
  // });
};
