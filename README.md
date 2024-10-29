 <p align="center">
    <img src="https://drive.google.com/uc?id=1B3-QSN0_TdvONf4oNb6Rg9xwyPjUAoTG" alt="Skill Bridge Logo" width="150"/>
  </p>

<h1 align="center">Skill Bridge</h1>

<p align="center">
    <strong>Empowering skills for the future</strong>
</p>

# 🎓 SkillsBridge

## Overview
Welcome to SkillsBridge, an innovative EdTech platform that bridges the skills gap with engaging, personalized learning experiences. Built with a microservices architecture, this platform combines AI-powered features like a recommendation engine and a chatbot, detailed user insights, and robust security features to create a seamless, secure, and insightful learning environment.



## 🚀 Features and Concepts Applied
1. **Robust Authentication & Authorization:**
    <p>
    <img src="https://github.com/user-attachments/assets/49efa76a-15ef-42de-a238-50026eb24f73" width="550"/>
    <img src="https://github.com/user-attachments/assets/e2988700-1e8c-4a1d-aeb5-236527fa181b" width="550"/>

  </p>

  - JWT-based secure access management 
  - Google OAuth for streamlined social login

2. **Data Management & Content Creation:**
  - CRUD operations for courses and user data with Prisma & NeonDB
  - Transcript generation for video content using Gemini API, with automatic MCQ creation

3. **AI-Powered Chatbot & Recommendation System:**
  - Chatbot crafted with NLP and neural networks for instant support
  - Personalized course recommendations using TF-IDF matrices, with cosine similarity based on user's learning history

4. **Admin Analytics Dashboard:**
  - Visual insights powered by Plotly, offering detailed graphs on user engagement and course completion rates

5. **User-Centric Features:**
  - Forgot Password and Contact Us forms with email support
  - Course transcript and MCQ generation for enhanced learning

## 🛠️ Languages and Frameworks
- **Frontend:** React, Vite, Tailwind CSS
- **Backend 1:** Node.js, Express.js
- **Backend 2:** Django (Python)
- **Database:** Prisma with NeonDB (PostgreSQL)
- **Authentication & API Integration:** JWT, Google OAuth, Gemini API, AWS S3 for storage
- **Data Processing:** TF-IDF and NLP libraries for recommendation and chatbot

## 📁 Project Structure
SkillsBridge is built with a microservices architecture:
- **Frontend (React):** Dynamic, interactive user interface
- **Backend 1 (Node.js):** Main API server handling authentication, user management, course data, and email functions
- **Backend 2 (Django):** Manages AI-driven services, recommendation engine, and analytics with Plotly

## 🧩 Setup Guide

### 1. Clone the Repository
git clone <repository-url>
cd skillsBridge

### 2. Install Dependencies

Client (React):
cd client
npm install

Server 1 (Node.js):
cd ../server1
npm install

Server 2 (Django):
cd ../server2
pip install -r requirements.txt

### 3. Environment Variables

Client (.env):
VITE_MY_IP=your_ip_here
VITE_CLOUDFRONT_URL=https://d1zl26g01esfr6.cloudfront.net
VITE_BACKEND_URL=http://your_backend_url_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id

Server 1 - Node.js (.env):
PORT=3000
DATABASE_URL="your_database_url"
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d
SESSION_SECRET=your_session_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
S3_ACCESS_KEY_ID=your_s3_access_key
S3_ACCESS_SECRET_KEY=your_s3_secret_key
YOUTUBE_SEARCH_API_KEY=your_youtube_api_key

Server 2 - Django (.env):
PGPASSWORD=your_pg_password
PGUSER=your_pg_user
PGDATABASE=your_pg_database
PGHOST=your_pg_host
MY_IP=your_ip_here

### 4. Run the Services

Start Client (React):
cd client
npm run dev

Start Server 1 (Node.js):
cd ../server1
node index.js

Start Server 2 (Django):
cd ../server2
python manage.py runserver

### 5. Database Migration
npx prisma migrate deploy
npx prisma db seed

### 6. Test Setup
Visit http://localhost:3000 to ensure the frontend connects with both backends and database functionalities work.

## 🧑‍🤝‍🧑 Team and Contributions
- **Teammate 1 - Frontend Specialist:** Developed React components, managed state, and handled client-side routing
- **Teammate 2 - Backend Engineer (Node.js):** Designed authentication flow, handled API routes, and managed database interactions
- **Teammate 3 - AI Engineer (Django):** Built chatbot and recommendation system, managed data visualizations for admin insights
- **Teammate 4 - Database & Integration:** Configured Prisma with NeonDB, optimized database queries, and ensured data accuracy across services

## ⚖️ License
SkillsBridge is licensed under the MIT License. See the LICENSE file for more details.
### Flowchart of the course recommendation system inside server2 directory 

```mermaid
graph TD
    A[Input Course Vector] --> B[Calculate Similarities]
    C --> D[Sort & Filter]
    
    subgraph "Mathematical Process"
        E[TF-IDF Calculation]
        F[Cosine Similarity]
        G[Score Normalization]
    end
    
    B --> E
    E --> F
    F --> G
    G --> C[Get Similarity Scores]
    
    subgraph "Recommendation Selection"
        H[Apply Diversity Rules]
        I[Type Filtering]
        J[Final Ranking]
    end
    
    D --> H
    H --> I
    I --> J

