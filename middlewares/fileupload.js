const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const filePath = path.join(__dirname,'../public/uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Dynamic file filter function
const dynamicFileFilter = (allowedTypes) => {
    return (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
        }
        cb(null, true);
    };
};

// Function to configure multer dynamically
const configureUpload = (allowedTypes, maxSize = 1024*1024) => {
    return multer({
        storage: storage,
        limits: { fileSize: maxSize }, // Default 1MB file size limit
        fileFilter: dynamicFileFilter(allowedTypes),
    }).single('file'); // Accepts a single file named 'file'
};

module.exports = configureUpload;