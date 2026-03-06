
<img src="https://cdn-icons-png.flaticon.com/512/2845/2845705.png" width="35"> BudgetBuddy – Finance Manager
<p align="left">
<img src="https://img.shields.io/badge/MERN-Stack-green.svg" />
<img src="https://img.shields.io/badge/Maintained%3F-yes-blue.svg" />
<img src="https://img.shields.io/badge/License-MIT-important.svg" />
</p>

BudgetBuddy is a high-performance financial management tool built on the MERN stack. It allows users to track income/expenses, visualize spending patterns via dynamic charts, and receive automated budget alerts.

🚀 Key Features
💳 Transaction Management – Full CRUD for tracking income and expenses.

📊 Dynamic Visualizations – Real-time spending charts and monthly breakdowns.

⚠️ Smart Budgeting – Set category-wise limits with automated breach alerts.

🔄 Recurring Logs – Automate recurring transactions (subscriptions/bills).

📄 Data Export – Download financial reports in CSV and PDF formats.

📱 Responsive UI – Seamless experience across mobile, tablet, and desktop.

🛠️ Tech Stack
Frontend	Backend	Database
React.js (Hooks)	Node.js	MongoDB
Redux Toolkit	Express.js	Mongoose
Tailwind CSS	JWT / Bcrypt	Atlas / Compass
Chart.js	Axios	Cloudinary (if used)
🏗️ Folder Architecture
Plaintext
📁 budgetbuddy-root
 ├── 📂 client          # React source code, components, hooks
 ├── 📂 server          # Node.js server, routes, controllers
 │    ├── 📂 models     # Mongoose Schemas (User, Transaction)
 │    ├── 📂 middleware # JWT Auth, Error Handlers
 │    └── 📂 config     # DB connection
 └── 📄 .env.example    # Environment variables template
⚙️ Quick Start
1. Server Setup
Bash
cd server
npm install
npm start
2. Client Setup
Bash
cd client
npm install
npm run dev
Note: Ensure your .env file in the server directory contains MONGO_URI and JWT_SECRET for the application to authenticate successfully.

📈 Future Roadmap
[ ] Plaid API integration for live bank syncing.

[ ] AI Insights to suggest budget optimizations.

[ ] Dark Mode toggle for enhanced accessibility.
