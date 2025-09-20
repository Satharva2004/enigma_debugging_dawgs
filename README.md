Vikas.AI — Virtual Interactive Knowledge for Asset Success
Vikas.AI is a comprehensive web-based platform designed to empower individuals with essential financial literacy skills. It combines interactive learning, AI-powered expert advice, and a community forum to make financial education engaging, personalized, and collaborative.

🚀 Features (MVP Scope)
1. Interactive Learning Modules
Micro-lessons (5–10 minutes) covering core financial topics like budgeting, saving, investing basics, and credit.

Real-world scenarios to apply knowledge (e.g., "You got your first job, now what?").

Visual simulations for complex concepts (e.g., a compound interest calculator).

2. Gamification Elements
Achievement badges (Budget Master, Investment Rookie).

XP points and progress tracking for completed modules.

3. AI-Powered Financial Experts
This is the core of our platform, offering on-demand, specialized advice. We have multiple AI-powered personas, each an expert in a specific financial domain:

💰 R&D Expert: For in-depth market research and analysis.

📈 Stock Market Expert: Provides insights and information on stock trading.

✈️ Trip to Expert: Assists with travel budgeting and planning.

🏦 Investment Banking Expert: Offers a high-level view of corporate finance.

👴 Retirement Plan Expert: Helps plan for long-term financial security.

The AI's responses are based on AI models and web search for the most current information.

4. Practical Tools
Personal Budget Planner: Track income and expenses with customizable categories.

Financial Goal Setting: Create and track progress for savings goals (e.g., a new laptop, an emergency fund).

Expense Categorization: Get spending insights with visual charts.

💬 Community Forum
A dedicated space where users can connect, share experiences, and discuss financial topics. The forum's primary goal is to foster an open dialogue about financial realities.

Featured Topic: A dedicated space to discuss how "Mutual Funds are Subject to Market Risks." This section encourages users to share personal stories, strategies, and thoughts on navigating market volatility.

🛠 Tech Stack
Frontend: React.js

Backend: Node.js + Express

Database: MongoDB

AI Integration: Gemini API (for expert personas)

Web Search: Integrated for up-to-date information.

Charts & Visualization: Chart.js

⚙️ Installation & Setup
Prerequisites
Node.js (v16+ recommended)

npm or yarn

MongoDB database connection

Steps
Clone the repository

Bash

git clone https://github.com/yourusername/financeu.git
cd financeu
Install dependencies

Bash

# For backend
cd backend
npm install

# For frontend
cd frontend
npm install
Set up environment variables
Create .env files in both the backend and frontend folders:

# Backend
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000

# Frontend
REACT_APP_API_BASE_URL=http://localhost:5000
Run the project

Bash

# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start
📈 Future Improvements
Leaderboards for competitive learning.

Social sharing of achievements.

Expanded lesson library (e.g., insurance, retirement planning).

A mobile app version.

More AI-driven personalization features.

A moderation system for the community forum to ensure a safe and constructive environment.

💡 About
Vikas.AI is built to be a one-stop platform for financial literacy. It combines interactive learning, expert AI guidance, practical tools, and a supportive community into a single, engaging experience.
