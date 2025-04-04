const authRoute = require("./authRoute");
const dashboardRoute = require("./dashboardRoute");
const postRoute = require("./postRoute");
const uploadRoutes = require("./uploadRoutes");

const apiRoutes = require("../api/routes/apiRoutes");
const path = require("path");
const route = [
  {
    path: "/auth",
    handler: authRoute,
  },
  {
    path: "/dashboard",
    handler: dashboardRoute,
  },
  {
    path: "/post",
    handler: postRoute,
  },
  {
    path: "/api",
    handler: apiRoutes,
  },
  {
    path: "/uploads",
    handler: uploadRoutes,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.json({
        message: "working",
      });
    },
  },
];

module.exports = (app) => {
  route.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
