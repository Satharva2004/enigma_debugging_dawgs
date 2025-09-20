VIKAS is a web-based gamified learning platform designed to help students build essential financial literacy skills. Through interactive lessons, gamification elements, and AI-powered tools, VIKAS makes learning about money engaging, practical, and personalized.
🚀 Features (MVP Scope)
1. Interactive Learning Modules
Micro-lessons (5–10 minutes) covering:
Budgeting
Saving
Investing basics
Loans & credit
Taxes
Real-world decision-tree scenarios (e.g., "You got your first job, now what?")
Visual simulations:
Compound interest calculator
Budget allocation pie charts
2. Gamification Elements
Achievement badges: Budget Master, Investment Rookie, Debt Destroyer
XP points and progress tracking for completed modules
3. Practical Tools
Student Budget Planner: Track income (part-time jobs, allowances) vs expenses (food, books, entertainment)
Goal Setting: Save for laptop, trip, or emergency fund with progress bars
Expense categorization with spending insights
4. AI-Powered Features
Personalized recommendations based on spending patterns
AI chatbot mentor for quick financial questions
Risk assessment for student-friendly investment options
🛠 Tech Stack
Frontend: React.js (with engaging animations)
Backend: Node.js + Express
Database: MongoDB (user progress tracking)
AI Integration: Gemini API (chatbot)
Charts & Visualization: Chart.js
 
NextJS
---
## ⚙️ Installation & Setup
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB database connection
### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financeu.git
   cd financeu
 
 
Install dependencies For backend:
For frontend:
Set up environment variables Create .env files in both backend and frontend folders:
Run the project
📈 Future Improvements
Leaderboards for competitive learning
Social sharing of achievements
Expanded lesson library (e.g., insurance, retirement planning)
Mobile app version
More AI-driven personalization features
💡 About
VIKAS is built as an MVP to demonstrate how gamification and AI can transform financial literacy education for students. It combines practical tools, interactive learning, and personalized guidance into a single engaging platform.
# Start backendcd backend
npm run dev
# Start frontendcd frontend
npm start
 
# Backend
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
# Frontend
REACT_APP_API_BASE_URL=http://localhost:5000
 
cd frontend
npm install
 
cd backend
npm install
