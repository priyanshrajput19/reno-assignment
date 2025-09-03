# School Management System

A full-stack web application for managing school information with image upload capabilities. Built with React frontend and Node.js/Express backend.

## 🚀 Features

- **Add Schools**: Create new school entries with detailed information
- **View Schools**: Display all schools in a responsive grid layout
- **Image Upload**: Upload and display school images
- **Responsive Design**: Modern UI that works on all devices
- **Empty State**: User-friendly empty state when no schools are added

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **CSS3** - Custom styling

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Reno-Assignment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   └── pageHeader/  # Page header component
│   │   ├── pages/          # Page components
│   │   │   ├── addSchool/  # Add school page
│   │   │   └── showSchools/ # Display schools page
│   │   ├── assets/         # Static assets (icons, images)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── config.js   # App configuration
│   │   │   ├── database.js # Database connection
│   │   │   ├── multer.js   # File upload config
│   │   │   └── schema.sql  # Database schema
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── public/         # Static files (uploaded images)
│   │   └── app.js          # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** database
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Reno-Assignment
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Database Setup

1. **Create a MySQL database**

   ```sql
   CREATE DATABASE school_management;
   ```

2. **Set up environment variables**

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   ```

3. **Initialize the database**

   The application will automatically create the required tables when you start the server.

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:4000`

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm start
   ```

   The frontend will run on `http://localhost:5173`

3. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📚 API Endpoints

### Schools API

| Method | Endpoint      | Description      | Body                                    |
| ------ | ------------- | ---------------- | --------------------------------------- |
| `POST` | `/addSchool`  | Add a new school | Form data with school details and image |
| `GET`  | `/getSchools` | Get all schools  | None                                    |

### School Data Structure

```json
{
  "id": 1,
  "name": "School Name",
  "address": "School Address",
  "city": "City Name",
  "state": "State Name",
  "contact": "1234567890",
  "email_id": "school@example.com",
  "image": "uploaded_image_filename.jpg",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 Features Overview

### Add School Page

- Form validation for all required fields
- Image upload with preview
- Responsive design
- Success/error handling

### Show Schools Page

- Grid layout for school cards
- Image display for schools with images
- Empty state when no schools exist
- Navigation to add school page

### Image Handling

- Images are stored in `backend/src/public/schoolImages/`
- Supported formats: JPG, JPEG, PNG
- Automatic directory creation
- Static file serving

## 🔧 Development

### Available Scripts

#### Frontend

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Code Structure

- **Components**: Reusable UI components in `frontend/src/components/`
- **Pages**: Main page components in `frontend/src/pages/`
- **Controllers**: Business logic in `backend/src/controllers/`
- **Routes**: API endpoints in `backend/src/routes/`
- **Config**: Configuration files in `backend/src/config/`

## 🚀 Deployment

### Frontend Deployment

```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory.

### Backend Deployment

1. Set up production environment variables
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Image Upload Issues**

   - Check file permissions on upload directory
   - Verify multer configuration
   - Ensure supported image formats

3. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend API endpoints

### Support

For support, please open an issue in the repository or contact the development team.
