### Why Used Sessions:

1. **User Authentication**: Sessions allow you to keep track of a user’s login state across multiple requests. This is crucial for authentication, as once a user logs in, you want to remember their session so that they don't have to authenticate again on every request.
2. **Security**: With sessions, sensitive user information (like their logged-in state) is stored server-side, while the client only holds a session identifier (stored in a cookie). This adds an extra layer of security compared to storing sensitive data directly in the client.
3. **User State**: Sessions help in maintaining user-specific data across requests, such as their logged-in status, preferences, or any other user-specific data that needs to persist throughout the session without re-submitting login credentials.

### How You Used Sessions:

1. **Session Store**: You set up a `MongoDBStore` to store session data in a MongoDB database. This ensures that the session information is persistent and can be shared across different instances of the application if necessary (e.g., in a scaled environment). The session expires after 2 hours of inactivity.
2. **Session Middleware**: You integrated the `express-session` middleware in the middleware array. This middleware handles the creation and management of sessions, saving the session ID to the user's cookies.
3. **Session Data**: When a user logs in successfully, their session is updated with `req.session.isLoggedIn = true` and their user data is stored in `req.session.user`. This allows you to check the user's login state across different routes.
4. **Session Expiration**: The session will automatically expire after 2 hours of inactivity (as configured), helping manage user sessions securely by limiting the duration of time a session remains active.

Overall, by using sessions, we enable a more secure, scalable, and user-friendly way of managing user authentication and state.
