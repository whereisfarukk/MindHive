## How the Cookies is set and retrive

### How `req.get("Cookie")` Works

- `req.get("Cookie")` retrieves the value of the `Cookie` header from the incoming HTTP request.
- When a client (e.g., browser) makes a request to your server, it sends stored cookies in the `Cookie` header.
- The server reads this header to retrieve previously set cookies.

### How the Cookie is Set:

In your loginPostController, after successful authentication, you're setting a cookie using:

```js
res.setHeader("Set-Cookie", "isLoggedIn=true");
```

This means:

- The server responds with an HTTP header:
  ```js
  Set-Cookie: isLoggedIn=true
  ```
- The browser receives this response and stores the cookie.
- On subsequent requests, the browser includes this cookie in the Cookie header.

### Example Flow:

1. **First Request (Before Login)**

   - The user visits the login page.
   - No cookies are stored yet.
   - `req.get("Cookie")` likely returns `undefined` or an empty value.

2. **Login Request**

   - The user submits login credentials.
   - If valid, the server sends:
     ```js
     Set-Cookie: isLoggedIn=true
     ```
   - The browser stores this cookie.

3. **Subsequent Requests**
   - The browser sends the cookie in the `Cookie` header:
     ```js
     Cookie: isLoggedIn = true;
     ```
   - Now, `req.get("Cookie")` in `loginGetController` will log:
     ```js
     isLoggedIn = true;
     ```
   - The value of `isLoggedIn` is send to the frontend and now its `true` and showing the logout button.
