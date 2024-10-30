 <p align="center">
    <img src="https://drive.google.com/uc?id=1B3-QSN0_TdvONf4oNb6Rg9xwyPjUAoTG" alt="Skill Bridge Logo" width="150"/>
  </p>

<h1 align="center">Skill Bridge</h1>

<p align="center">
    <strong>Empowering skills for the future</strong>
</p>

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

```mermaid
%%{init: {
    'theme': 'dark',
    'themeVariables': {
        'fontFamily': 'arial',
        'fontSize': '14px',
        'textColor': '#ffffff',
        'lineColor': '#ffffff'
    }
}}%%
graph LR
    subgraph "🖥️ User Interface"
        A["👤 User Question"] --> B["🌐 API Gateway"]
        style A fill:#012a4a,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style B fill:#013a63,stroke:#ffffff,color:#ffffff,stroke-width:2px
    end
    
    subgraph "🧠 Neural Processing"
        B --> C["🎯 Intent Analysis"]
        C --> D["🔄 Context Engine"]
        style C fill:#2c0735,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style D fill:#3a0ca3,stroke:#ffffff,color:#ffffff,stroke-width:2px
    end
    
    subgraph "🔄 Language Processing"
        D --> E["✨ Token Magic"]
        E --> F["📊 Word Vectors"]
        F --> G["🤖 AI Brain"]
        style E fill:#0a4c1d,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style F fill:#156b2a,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style G fill:#1b892e,stroke:#ffffff,color:#ffffff,stroke-width:2px
    end
    
    subgraph "💡 Knowledge Base"
        H["🧩 Neural Network"] --> G
        I["📚 Response Library"] --> J
        K["📈 Learning Data"] --> H
        style H fill:#662e1c,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style I fill:#8b3a1d,stroke:#ffffff,color:#ffffff,stroke-width:2px
        style K fill:#ae4a1e,stroke:#ffffff,color:#ffffff,stroke-width:2px
    end
    
    G --> J["⚡ Response Crafting"]
    J --> L["📤 Smart Reply"]
    L --> M["🎯 User Interface"]
    
    style J fill:#590d22,stroke:#ffffff,color:#ffffff,stroke-width:2px
    style L fill:#800f2f,stroke:#ffffff,color:#ffffff,stroke-width:2px
    style M fill:#012a4a,stroke:#ffffff,color:#ffffff,stroke-width:2px
    
    %% Set all connection lines to white
    linkStyle default stroke:#ffffff,stroke-width:2px
```

```mermaid
graph LR
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
  ```
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

### Client (Frontend)
```
client/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   └── styles/
```

### Server (Backend 1)
```
server/
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── image/
│   ├── middleware/
│   ├── prisma/
│   ├── public/
│   ├── routes/
│   ├── services/
│   ├── temp/
│   └── utils/
```

### Server2 (Backend 2)
```
server2/
├── analytics/
├── chatbot_app/
├── course_recommendations/
└── server2/
```

Our project uses a microservices architecture:
- **Client**: React-based frontend for the user interface
- **Server**: Node.js backend handling core functionality
- **Server2**: Django backend managing AI services and analytics

## 🧩 SkillsBridge Setup Guide

This guide will help you set up the SkillsBridge platform locally for development.

### 1. Repository Setup

```bash
# Clone the repository
git clone <repository-url>
cd skillsBridge

# Create necessary environment files
touch client/.env server/.env server2/.env
```

### 2. Service Setup

#### Client (Frontend)
```bash
cd client
npm install

# Start development server
npm run dev -- --host  # Runs on http://{yourIP}:5173
```

#### Server 1 (Node.js Backend)
```bash
cd server
npm install

# Database setup
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# Start server
npm start  # Runs on http://localhost:3000
```

#### Server 2 (Django Backend)
```bash
cd server2

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Database setup
python manage.py migrate

# Start server
python manage.py runserver  # Runs on http://localhost:8000
```

### 3. Environment Configuration

#### Client (.env)
```env
# Frontend Configuration
VITE_MY_IP=your_ip_here
VITE_CLOUDFRONT_URL=your_cloudfront_url
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Server (.env)
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/skillsbridge"

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d
SESSION_SECRET=your_session_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AWS S3
S3_ACCESS_KEY_ID=your_s3_access_key
S3_ACCESS_SECRET_KEY=your_s3_secret_key

# APIs
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_SEARCH_API_KEY=your_youtube_api_key

# Email
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

#### Server2 (.env)
```env
# Database Configuration
PGPASSWORD=your_pg_password
PGUSER=your_pg_user
PGDATABASE=your_pg_database
PGHOST=localhost
MY_IP=your_ip_here

```

## 👥 Team & Contributions

1 **[jaydoshi2](https://github.com/jaydoshi2)**
  - Led project ideation and planning
  - Designed and implemented database architecture
  - Implemented JWT authentication system
  - Established project architecture and code structure
  - Managed Django integration for AI services made by xKirtan.

2 **[archanpatel1425](https://github.com/archanpatel1425)**
  - Developed comprehensive course page functionality
  - Implemented responsive design across all pages
  - Built core course interaction features

3 **[1JAYPANDYA1](https://github.com/1JAYPANDYA1)**
  - Developed video page functionality (like/dislike system)
  - Implemented certificate generation system
  - Enhanced overall website styling and UI polish
  - Managed video-related backend integrations

4 **[kavya-trivedi](https://github.com/kavya-trivedi)**
  - Designed and implemented responsive home page
  - Created auxiliary pages (About, Contact, Profile)
  - Built supporting backend services for user-facing pages

5 **[xKIRTAN](https://github.com/xKIRTAN)**
  - Developed chatbot system architecture
  - Created analytics dashboard and visualizations
  - Implemented content-based course recommendation engine
  - Designed and integrated ML algorithms

## ⚖️ License
SkillsBridge is licensed under the MIT License. See the LICENSE file for more details.
