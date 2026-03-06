💰 BudgetBuddy – Finance ManagerBudgetBuddy is a full-stack MERN application that empowers users to manage their financial health through intuitive tracking, smart budgeting, and data-driven insights.🚀 Core FeaturesFeatureDescriptionTransaction CRUDComplete management of income and expense entries.Smart BudgetingSet monthly limits per category with visual breach alerts.Visual AnalyticsDynamic spending charts and graphs using Chart.js/Recharts.AutomationHandle recurring transactions (subscriptions, bills) automatically.Data PortabilityExport financial history and reports to CSV or PDF.CategorizationOrganize spending (Food, Rent, etc.) for granular tracking.🛠️ Technical StackFrontendReact.js (UI) & Tailwind CSS (Styling)Redux Toolkit (State Management)Axios (API Requests)BackendNode.js & Express.js (Server)MongoDB & Mongoose (Database & Modeling)JWT & Bcrypt (Secure Authentication)🏗️ Project StructurePlaintextBudgetBuddy/
├── client/           # React Frontend
├── server/           # Node.js Backend
│   ├── models/       # Mongoose Schemas (User, Transaction, Budget)
│   ├── routes/       # API Endpoints
│   └── middleware/   # Auth & Error Handling
└── README.md
⚙️ Quick SetupClone & InstallBashgit clone https://github.com/your-username/budgetbuddy.git
npm install && cd client && npm install
Environment Variables (server/.env)Code snippetPORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
ExecutionBackend: npm run dev (from /server)Frontend: npm start (from /client)📈 RoadmapPlaid Integration: Sync real-time bank transactions.AI Financial Advisor: Predictive spending alerts using ML.Multi-Currency: Support for global currency conversion. expenses.
