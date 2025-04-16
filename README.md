
# Think Academies Frontend

## 🔗 Live Link
[Click here to visit the live site](https://ecommercesitehtml.netlify.app/)


![image](https://github.com/user-attachments/assets/19c3d152-8503-46cd-863b-82c3af49f851)

A modern web application for handling file uploads with validation and error handling.

## Features

- File type validation (JPEG, PNG, GIF)
- File size limit (5MB)
- Error handling and user feedback
- Modern JavaScript implementation
- Easy to integrate with any backend API

## Project Structure

```
├── index.html          # Main HTML file
├── js/
│   └── redmi.js        # Redmi upload functionality
├── styles/             # CSS styles
└── images/             # Project images
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/redmi-uploader.git
```

2. Navigate to the project directory:
```bash
cd redmi-uploader
```

3. Open `index.html` in your web browser or serve it using a local server.

## Usage

1. Import the RedmiUploader in your HTML:
```html
<script type="module" src="js/redmi.js"></script>
```

2. Create an instance and use it:
```javascript
const uploader = new RedmiUploader();
const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const result = await uploader.uploadFile(file);
    console.log(result);
});
```

## API Integration

To integrate with your backend API, uncomment and modify the fetch call in `redmi.js`:

```javascript
const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/redmi-uploader](https://github.com/yourusername/redmi-uploader) 
