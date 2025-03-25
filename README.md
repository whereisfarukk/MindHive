## How populate works

## Code:

```json
let commentJSON = await Comment.findById(createdComment._id).populate({
  path: "user",
  select: "profilePics name",
});
```

### Explanation:

- `Comment.findById(createdComment._id)`

  - This part searches for a comment in the database using its `_id`.
  - `createdComment._id` is assumed to be the `_id` of a comment that was just created.
  - `findById` is a Mongoose method that retrieves a single document by its `_id`.

- `.populate({ path: "user", select: "profilePics name" })`

  - This uses Mongoose's .`populate()` method to replace the `user` field (which stores only a reference to the `User` model) with the actual user data.

  - `path: "user"`: Specifies that the `user` field in the `Comment` schema should be populated with data from the `User` collection.

  - `select: "profilePics name"`: Limits the populated data to only the `profilePics` and `name` fields of the referenced `User` document.

### Why Use populate?

- In the `Comment` schema, the `user` field stores only the `_id` of a `User`.

- If you query `Comment` without `populate`, you will only get the `user`'s `_id`.

- By using `populate()`, we replace the `user` field with the actual user object containing `name` and `profilePics`.

### Example:

#### Suppose we have the following User document:

```json
{
  "_id": "64f1a2b4c3d9a500a8e4b12d",
  "name": "Omar Faruk",
  "email": "omar@example.com",
  "password": "hashedpassword",
  "profilePics": "/uploads/omar.jpg"
}
```

#### And a Comment document like this:

```json
{
  "_id": "6601b2c3d4e5f600b7c8d9e0",
  "post": "65e1b3c2d3e4f500c7d8e9f1",
  "user": "64f1a2b4c3d9a500a8e4b12d",
  "body": "This is a comment",
  "replies": []
}
```

### Without `populate()`:

```json
{
  "_id": "6601b2c3d4e5f600b7c8d9e0",
  "post": "65e1b3c2d3e4f500c7d8e9f1",
  "user": "64f1a2b4c3d9a500a8e4b12d",
  "body": "This is a comment",
  "replies": []
}
```

### With `populate()`:

```json
{
  "_id": "6601b2c3d4e5f600b7c8d9e0",
  "post": "65e1b3c2d3e4f500c7d8e9f1",
  "user": {
    "_id": "64f1a2b4c3d9a500a8e4b12d",
    "name": "Omar Faruk",
    "profilePics": "/uploads/omar.jpg"
  },
  "body": "This is a comment",
  "replies": []
}
```

Now, instead of just the `user`'s `_id`, we get the user's `name` and `profilePics` as well.
