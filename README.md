### 📌 When to Use multipart/form-data and Why Multer is Necessary

The `enctype="multipart/form-data"` attribute is used in HTML forms when you need to:
✅ Upload **files** (e.g., images, documents)
✅ Send **large amounts of binary data**

This encoding type ensures that the data is **split into multiple parts**, each part representing a **form field or file**. It is particularly useful for handling file uploads because it **preserves the integrity of binary data**.

### ⚠️ Behavior Without Middleware

If your form includes **file uploads** and you set:

```js
enctype = "multipart/form-data";
```

but if we do not use middleware like `multer` on the server side, the uploaded files **will not be processed correctly**.

### 🚨 What Happens?

❌ The server receives an **empty object** (`req.body`).
❌ No file data is available (`req.file` or `req.files` are `undefined`).

This occurs because **the server does not know how to parse the multipart data** without a **dedicated middleware**.
