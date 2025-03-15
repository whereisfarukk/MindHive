## Key Difference Between `extName` and `mimeType`

The key difference between `extName` and `mimeType` in your code is how they determine the file type:

### `extName` (Extension-based check)

- Extracts the file extension using `path.extname(file.originalname)`.
- Converts it to lowercase and checks if it matches the allowed types (`jpeg|jpg|png|gif`).
- Relies on the **file name**, which can be manipulated by a user (e.g., renaming `malware.exe` to `image.png`).

### `mimeType` (MIME type-based check)

- Checks `file.mimetype`, which is set based on the file's actual content.
- Ensures the file is truly an image and not just renamed.
- More **reliable** than extension checking, as the MIME type is detected by the server.

### Example:

A file named `image.jpg` but containing non-image data might pass the `extName` check but fail the `mimeType` check.

### Best Practice:

It is recommended to **use both checks together** for better security. 🚀
