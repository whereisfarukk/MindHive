# 🚀 `app.use()` vs `app.get()` in Express

## 1️⃣ **When to Use `app.use()` vs `app.get()`**

| Scenario                                | Use `app.use()`                     | Use `app.get()`                         |
| --------------------------------------- | ----------------------------------- | --------------------------------------- |
| **Mounting Routers**                    | ✅ `app.use("/dashboard", router);` | ❌ Not suitable                         |
| **Middleware (logging, auth, etc.)**    | ✅ `app.use(someMiddleware);`       | ❌ Not suitable                         |
| **Handling subroutes (`/dashboard/*`)** | ✅ `app.use("/dashboard", router);` | ❌ Use `app.get("/:subpath")` in router |
| **Strict path matching**                | ❌ Avoid for specific paths         | ✅ `app.get("/dashboard", handler);`    |
|  |

### 🔹 `app.use()`

```js
app.use("/dashboard", dashboardRoute);
```

✅ Matches:

- `/dashboard`
- `/dashboard/anything` (if `dashboardRoute` supports it)

### 🔹 `app.get()`

```js
app.get("/dashboard", (req, res) => {
  res.json({ message: "Dashboard Home" });
});
```

✅ Matches: `/dashboard`
❌ Does NOT match: `/dashboard/anything`

## 2️⃣ Why Does / Get Executed for Unknown Routes?

**Your setup**:

```js
const route = [
  { path: "/auth", handler: authRoute },
  { path: "/dashboard", handler: dashboardRoute },
  { path: "/", handler: (req, res) => res.json({ message: "working" }) },
];

module.exports = (app) => {
  route.forEach((r) => app.use(r.path, r.handler));
};
```

- If **`/dashboard/anything`** is not found in **`dashboardRoute`**, Express moves to the next route.
- Since **`/`** is a catch-all route, it executes the **`/`** handler instead.

## 3️⃣ How to Fix It?

**Add a 404 handler at the end:**

```js
module.exports = (app) => {
  route.forEach((r) => app.use(r.path, r.handler));

  // 404 Middleware
  app.use((req, res) => res.status(404).json({ error: "Route not found" }));
};
```

✅ Now, unknown routes like `/dashboard/anything` return:

```js
{ "error": "Route not found" }
```

Instead of `{ "message": "working" }`.
