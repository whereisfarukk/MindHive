const authRoute = require("./authRoute");
const dashboardRoute = require("./dashboardRoute");

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
