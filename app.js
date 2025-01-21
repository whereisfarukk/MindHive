const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.json({
    message: "working",
  });
});
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
