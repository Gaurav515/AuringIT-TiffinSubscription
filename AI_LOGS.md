# AI conversation log



Problem assignment

Each candidate's assigned problem is listed, student-wise, in the sheet below — please ensure every candidate works on their own allotted problem:
https://docs.google.com/spreadsheets/d/1KnpL2zTgyh6FxIPt7hLjsSU1TG_xdOVF/edit?usp=sharing&ouid=113305145576875992418&rtpof=true&sd=true

What every solution must include (mandatory)

Each submission is expected to be a working full-stack product. Every solution must include:

A database (real persistence with a sensible schema).
REST APIs for the core operations — and the candidate must list these endpoints in the README.
A usable UI over those APIs.
User registration and login.
Search.
A one-page landing page for the product (what it is, key features, target audience, how it helps, and three features they would build next).
Pagination and sorting
Submission

The final solution must be a public GitHub repository, with the following three files in the root folder (used for evaluation):

README.md — how to set up, run and debug the project, plus the list of API endpoints.
REASONING.md — the thought process behind the solution, including how they tested and fixed issues.
AI_LOGS.md — the complete conversation with the AI tool, pasted as-is. It must not be modified in any way; any alteration will lead to a deduction of marks. The storyline
A home-style tiffin (lunch delivery) service. Customers subscribe to a monthly plan and get lunch delivered every weekday. Life happens — they pause for a few days (travel, festivals) and shouldn’t be charged for paused days. At month-end the owner needs each customer’s bill: the plan price pro-rated for the days actually delivered. Customers are looked up by phone, and the owner wants to see who’s active versus paused.
Build the tiffin owner something so every customer is billed only for the days they were actually served.
(Build it for any tiffin service. Get subscribe, pause/resume and the pro-rated bill right first, then the lookups.) explain this problem statement

Yes. This is essentially a full-stack software development assignment where the candidate must build a small Tiffin Subscription & Billing Management System.

The important part is: the assignment is not asking for a simple billing page. It wants a complete working application with database, backend APIs, frontend, authentication, search, pagination, sorting, and documentation.

1. What is the actual business problem?
Imagine a small home-style tiffin service.

The owner has 100 customers.

Each customer subscribes to a monthly lunch plan.

For example:

Customer: Rahul

Phone: 9876543210

Monthly plan: ₹3,000

Service: Lunch

Delivery days: Monday–Friday

Normally, Rahul would receive lunch every weekday.

But suppose Rahul goes on vacation from 10 September to 15 September.

He tells the tiffin owner:

"Pause my tiffin for these days."

The owner should not charge Rahul for the days he didn't receive food.

So the software needs to keep track of:

Customer
   ↓
Subscription
   ↓
Active / Paused
   ↓
Days actually served
   ↓
Monthly bill
2. The core requirement
The most important sentence in the assignment is:

"Build the tiffin owner something so every customer is billed only for the days they were actually served."

This is the heart of the project.

For example:

Monthly plan
₹3,000/month

Suppose September has:

22 weekdays

Therefore:

Daily rate = ₹3,000 / 22
           = ₹136.36 approximately
If the customer was served for only 18 days:

Bill = ₹136.36 × 18
     = ₹2,454.48
The exact calculation method should be clearly defined in your application.

3. What does Subscribe mean?
The owner should be able to create a subscription for a customer.

For example:

Customer Name: Rajesh
Phone: 9876543210

Plan: Monthly Lunch
Price: ₹3000

Start Date: 01-09-2026
Status: Active
The database should store this information.

A possible database structure:

Customer
customers
---------
id
name
phone
email
address
created_at
Subscription
subscriptions
-------------
id
customer_id
plan_name
monthly_price
start_date
status
created_at
4. What does Pause mean?
This is one of the most important parts.

Suppose:

Subscription:
01 Sep → 30 Sep

Monthly price:
₹3000
Customer travels:

10 Sep → 15 Sep
The owner clicks:

Pause Subscription

and records:

Pause From: 10 Sep
Pause To: 15 Sep
Reason: Vacation
The system should remember these dates.

For example:

Subscription Pause
subscription_pauses
-------------------
id
subscription_id
pause_from
pause_to
reason
created_at
5. What does Resume mean?
After the customer returns, the owner should be able to resume the service.

For example:

Customer: Rajesh

Status:
PAUSED
Then:

Resume Date:
16 Sep
The status becomes:

ACTIVE
Therefore:

01 Sep - 09 Sep → Served
10 Sep - 15 Sep → Paused
16 Sep onwards  → Served
6. Why "actually served" is important
The software shouldn't simply calculate:

Monthly Price ÷ 30 × days
because this is a weekday lunch delivery service.

You need to decide and document what constitutes a billable day.

For example, if the service operates Monday–Friday:

Monday     → billable
Tuesday    → billable
Wednesday  → billable
Thursday   → billable
Friday     → billable
Saturday   → not billable
Sunday     → not billable
Then pauses remove eligible delivery days.

So the billing engine effectively calculates:

Eligible weekdays
       -
Paused weekdays
       =
Actually served days
Then:

Bill = Daily Rate × Actually Served Days
7. Example of the complete calculation
Suppose:

Monthly plan = ₹3,000

September has:

22 weekdays
Customer pauses:

10 Sep → 15 Sep
Assume that period contains 4 weekdays.

Then:

Total eligible days = 22

Paused days = 4

Served days = 22 - 4
            = 18
Daily rate:

₹3,000 / 22
= ₹136.36
Bill:

₹136.36 × 18
= ₹2,454.48
The owner can then see:

Customer       Served Days    Paused Days    Bill
--------------------------------------------------
Rajesh         18             4              ₹2454.48
8. Customer lookup by phone
The assignment specifically says:

Customers are looked up by phone.

So the owner should have something like:

Search Customer

[ 9876543210              ] 🔍
The system returns:

Rajesh Gupta
9876543210

Plan: ₹3000/month
Status: ACTIVE
Served Days: 18
Paused Days: 4
Current Bill: ₹2454.48
Phone number should ideally have a database index because this is one of the primary lookup methods.

9. Active vs Paused customers
The owner wants to quickly know:

Active customers
ACTIVE
----------------------------
Rajesh       9876543210
Amit         9876543211
Rohit        9876543212
Paused customers
PAUSED
----------------------------
Suresh       9876543213
Vikas        9876543214
The dashboard could therefore have:

-----------------------------------------
 Tiffin Management Dashboard
-----------------------------------------

Customers       125

Active           108

Paused            17

This Month
Expected Billing ₹3,24,500
-----------------------------------------
10. What does "full-stack product" mean?
This is very important for the assignment.

They don't want only a frontend.

They expect:

Frontend
   ↓
REST API / Backend
   ↓
Database
For example, you could build:

Frontend
React.js

Backend
Node.js + Express.js

Database
MongoDB

So:

React
  ↓
Express REST API
  ↓
MongoDB
This would be a standard MERN implementation.

11. User registration and login
The owner must be able to register/login.

For example:

Register
Name
Email
Password
Confirm Password
Then:

Create Account
Login
Email
Password

[ LOGIN ]
After login:

Dashboard
Customers
Subscriptions
Pause/Resume
Billing
Reports
You can implement authentication using:

JWT
bcrypt/password hashing
12. REST APIs are mandatory
The assignment specifically says:

"REST APIs for the core operations — and the candidate must list these endpoints in the README."

So don't build everything directly in React.

For example:

Authentication
POST /api/auth/register
POST /api/auth/login
Customers
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
Search
GET /api/customers?phone=9876543210
Subscription
POST /api/subscriptions
GET  /api/subscriptions
GET  /api/subscriptions/:id
Pause
POST /api/subscriptions/:id/pause
Resume
POST /api/subscriptions/:id/resume
Billing
GET /api/billing/:customerId?month=2026-09
The exact API design is up to the candidate, but all important endpoints need to be documented in README.md.

13. Search
Search is mandatory.

At minimum, support:

Search by phone
It would also be useful to support:

Name
Phone
Status
Example:

Search: 9876543210

Result:
Rajesh Gupta
9876543210
ACTIVE
₹3000 Plan
14. Pagination
Suppose the owner has 5,000 customers.

You shouldn't display all 5,000 at once.

Instead:

Customers

1–20 of 5000

< Previous    1  2  3  4  5    Next >
API example:

GET /api/customers?page=1&limit=20
Response could contain:

{
  "data": [...],
  "page": 1,
  "limit": 20,
  "total": 5000,
  "totalPages": 250
}
15. Sorting
Sorting is also mandatory.

For example:

Sort By:

Name ↑
Name ↓

Phone ↑
Phone ↓

Bill ↑
Bill ↓

Created Date ↑
Created Date ↓
API example:

GET /api/customers?page=1&limit=20&sort=name&order=asc
16. One-page landing page
This is another requirement people can easily miss.

Your application should have a landing page explaining the product.

For example:

Hero section
SmartTiffin

Simple subscription and billing management for home-style tiffin businesses.

Then explain:

What it is
A system that helps tiffin owners manage customers, subscriptions, pauses and monthly pro-rated billing.

Key features
Customer management

Monthly subscriptions

Pause/resume service

Automatic pro-rated billing

Phone-based search

Active/paused dashboard

Target audience
Home Tiffin Services
Lunch Delivery Businesses
Small Food Businesses
How it helps
Instead of calculating bills manually in Excel/registers, the owner can see exactly how many eligible days each customer was served.

17. "Three features they would build next"
The landing page must mention three future features.

For example:

Coming Next
1. WhatsApp Billing

Automatically send monthly bills to customers through WhatsApp.

2. Online Payments

Allow customers to pay their monthly bill online.

3. Delivery Tracking

Track daily lunch deliveries and delivery status.

These are just examples; the candidate can choose other sensible features.

18. The three mandatory documentation files
This is very important because the evaluator will use these files.

Your GitHub repository should look approximately like:

tiffin-management-system/
│
├── README.md
├── REASONING.md
├── AI_LOGS.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── ...
19. README.md
README should explain:

Project
What the application does.

Tech stack
For example:

React
Node.js
Express
MongoDB
JWT
Installation
git clone ...
cd ...
npm install
Environment variables
For example:

MONGO_URI=
JWT_SECRET=
PORT=
Run
npm run dev
API endpoints
List every important endpoint.

Database schema
Explain the important collections/tables.

Testing
Explain how to test the system.

20. REASONING.md
This file should explain how the candidate designed the solution.

For example:

Why MongoDB?

Why JWT?

Why did we separate subscription and pause records?

How is billing calculated?

How are weekends handled?

How are overlapping pauses handled?

How does search work?

How does pagination work?

How were edge cases tested?
For example, an important edge case:

Customer pauses:
10 Sep → 15 Sep

Then tries to pause again:
12 Sep → 18 Sep
Your application needs a defined behavior rather than accidentally double-counting days.

21. AI_LOGS.md
This is unusual but extremely important.

They require:

complete conversation with the AI tool, pasted as-is

That means if the candidate uses ChatGPT/another AI tool during development, they need to preserve the conversation and put it into:

AI_LOGS.md
Do not edit or rewrite the conversation.

The assignment explicitly says modification can result in deduction.

So if using AI, maintain the original logs carefully.

22. What the evaluator is really looking for
If I simplify the whole assignment, the evaluator wants to see this workflow working:

             ┌───────────────┐
             │     LOGIN     │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │   DASHBOARD   │
             └───────┬───────┘
                     ↓
              Find customer
              by phone number
                     ↓
             ┌───────────────┐
             │   CUSTOMER    │
             └───────┬───────┘
                     ↓
             Create subscription
                     ↓
             ┌───────────────┐
             │    ACTIVE     │
             └───────┬───────┘
                     ↓
                Customer
                requests
                  pause
                     ↓
             ┌───────────────┐
             │    PAUSED     │
             └───────┬───────┘
                     ↓
                  RESUME
                     ↓
             ┌───────────────┐
             │    ACTIVE     │
             └───────┬───────┘
                     ↓
             End of month
                     ↓
            Calculate served days
                     ↓
            Calculate pro-rata bill
                     ↓
             ┌───────────────┐
             │ MONTHLY BILL  │
             └───────────────┘
The most important business logic
I would design the billing engine around this concept:

Monthly Plan
      ↓
Determine service days
      ↓
Remove paused days
      ↓
Count actual served days
      ↓
Calculate daily rate
      ↓
Generate bill
For example:

Monthly Price             ₹3,000
Service Days                  22
Paused Days                    4
Actual Served Days            18

Daily Rate = 3000 / 22

Final Bill = Daily Rate × 18
In one sentence
You are building a mini SaaS application for a tiffin owner that manages customers and subscriptions, lets the owner pause/resume deliveries, and automatically calculates each customer's monthly bill based only on the eligible days they actually received tiffin.

The Subscribe → Pause → Resume → Calculate Served Days → Generate Pro-Rata Bill workflow is the core of the assignment; search, login, pagination, sorting, landing page, APIs, and documentation are the required supporting features.


Yes. For your prototype, I would keep the frontend simple and API-ready rather than building a large component architecture.

Below is a complete starter frontend using React + Vite + Axios + React Router. It gives you:

Landing page

Register

Login

Dashboard

Customer search

Add customer

Subscribe

Pause/resume

Billing

Pagination

Sorting

API service layer

JWT token handling

You can connect your backend endpoints directly afterward.

1. Frontend structure
frontend/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── services/
    │   └── api.js
    │
    ├── context/
    │   └── AuthContext.jsx
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── CustomerForm.jsx
    │   ├── CustomerTable.jsx
    │   ├── SubscriptionModal.jsx
    │   ├── PauseModal.jsx
    │   └── BillCard.jsx
    │
    └── pages/
        ├── Landing.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── Dashboard.jsx
        ├── Customers.jsx
        └── Billing.jsx
Install:

npm install axios react-router-dom
2. main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
3. App.jsx
This controls your application routes.

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";

import Navbar from "./components/Navbar";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}
4. services/api.js
This is the important file for integrating your backend.

You only need to change the API base URL.

import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ==========================
// AUTH
// ==========================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getCurrentUser = () =>
  API.get("/auth/me");


// ==========================
// CUSTOMERS
// ==========================

export const getCustomers = (params) =>
  API.get("/customers", {
    params,
  });

export const getCustomer = (id) =>
  API.get(`/customers/${id}`);

export const createCustomer = (data) =>
  API.post("/customers", data);

export const updateCustomer = (id, data) =>
  API.put(`/customers/${id}`, data);


// ==========================
// SUBSCRIPTIONS
// ==========================

export const createSubscription = (data) =>
  API.post("/subscriptions", data);

export const pauseSubscription = (id, data) =>
  API.post(`/subscriptions/${id}/pause`, data);

export const resumeSubscription = (id, data) =>
  API.post(`/subscriptions/${id}/resume`, data);


// ==========================
// BILLING
// ==========================

export const getCustomerBill = (customerId, month) =>
  API.get(`/billing/${customerId}`, {
    params: { month },
  });

export const getBilling = (params) =>
  API.get("/billing", {
    params,
  });


export default API;
Your production/deployed frontend can use:

VITE_API_URL=https://your-backend-url.com/api
5. context/AuthContext.jsx
import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
} from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return response.data;
  };

  const register = async (data) => {
    return await registerUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
6. Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Tiffin<span>Manager</span>
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/customers">
          Customers
        </Link>

        <Link to="/billing">
          Billing
        </Link>

        <span className="user-name">
          {user?.name}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}
7. Landing.jsx
This satisfies the assignment's landing-page requirement.

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <h1>
            Simple Tiffin
            <br />
            Subscription Management
          </h1>

          <p>
            Manage customers, monthly subscriptions,
            pause days and automatically calculate
            pro-rated monthly bills.
          </p>

          <Link
            to="/register"
            className="primary-btn"
          >
            Get Started
          </Link>

        </div>

      </section>


      <section className="features">

        <h2>Everything You Need</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Subscriptions</h3>
            <p>
              Manage monthly tiffin subscriptions
              easily.
            </p>
          </div>

          <div className="feature-card">
            <h3>Pause & Resume</h3>
            <p>
              Customers can pause deliveries for
              travel or festivals.
            </p>
          </div>

          <div className="feature-card">
            <h3>Pro-rated Billing</h3>
            <p>
              Automatically calculate bills based
              on actual delivered days.
            </p>
          </div>

        </div>

      </section>


      <section className="audience">

        <h2>Built for Tiffin Services</h2>

        <p>
          Designed for home-style and local tiffin
          businesses that manage recurring lunch
          subscriptions.
        </p>

      </section>


      <section className="next-features">

        <h2>Coming Next</h2>

        <ul>
          <li>Online Payments</li>
          <li>WhatsApp Notifications</li>
          <li>Delivery Tracking</li>
        </ul>

      </section>

    </div>
  );
}
8. Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await login(
        form.email,
        form.password
      );

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}
9. Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Register() {

  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await register(form);

      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h2>Create Account</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
        />

        <button
          className="primary-btn"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}
10. Dashboard.jsx
import { useEffect, useState } from "react";

import { getCustomers } from "../services/api";

export default function Dashboard() {

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers = async () => {

    try {

      const response = await getCustomers({
        page: 1,
        limit: 100,
      });

      setCustomers(
        response.data.customers || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const activeCustomers =
    customers.filter(
      (c) =>
        c.subscription?.status === "ACTIVE"
    ).length;

  const pausedCustomers =
    customers.filter(
      (c) =>
        c.subscription?.status === "PAUSED"
    ).length;

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <div className="page">

      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="stat-card">
          <span>Active</span>
          <strong>{activeCustomers}</strong>
        </div>

        <div className="stat-card">
          <span>Paused</span>
          <strong>{pausedCustomers}</strong>
        </div>

      </div>


      <div className="dashboard-card">

        <h2>Quick Overview</h2>

        <p>
          Manage your customers, subscriptions
          and monthly billing from the menu.
        </p>

      </div>

    </div>
  );
}
11. Customers.jsx
This is the main page for the prototype.

import { useEffect, useState } from "react";

import {
  getCustomers,
  createCustomer,
  createSubscription,
  pauseSubscription,
  resumeSubscription,
} from "../services/api";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {

    loadCustomers();

  }, [search, page]);


  const loadCustomers = async () => {

    setLoading(true);

    try {

      const response = await getCustomers({
        search,
        page,
        limit: 10,
        sortBy: "name",
        sortOrder: "asc",
      });

      setCustomers(
        response.data.customers || []
      );

      setTotalPages(
        response.data.totalPages || 1
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  const handleAddCustomer = async (e) => {

    e.preventDefault();

    try {

      await createCustomer(newCustomer);

      setNewCustomer({
        name: "",
        phone: "",
        address: "",
      });

      setShowAdd(false);

      loadCustomers();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create customer"
      );

    }
  };


  const subscribe = async (customerId) => {

    const startDate =
      prompt(
        "Enter subscription start date (YYYY-MM-DD)"
      );

    if (!startDate) return;

    try {

      // Replace planId with the ID returned
      // by your backend/default plan.
      await createSubscription({
        customerId,
        planId: "YOUR_PLAN_ID",
        startDate,
      });

      loadCustomers();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Subscription failed"
      );

    }
  };


  const pause = async (subscriptionId) => {

    const from = prompt(
      "Pause from (YYYY-MM-DD)"
    );

    const to = prompt(
      "Pause to (YYYY-MM-DD)"
    );

    if (!from || !to) return;

    try {

      await pauseSubscription(
        subscriptionId,
        {
          from,
          to,
          reason: "Customer request",
        }
      );

      loadCustomers();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Pause failed"
      );

    }
  };


  const resume = async (subscriptionId) => {

    const resumeDate =
      prompt(
        "Resume date (YYYY-MM-DD)"
      );

    if (!resumeDate) return;

    try {

      await resumeSubscription(
        subscriptionId,
        {
          resumeDate,
        }
      );

      loadCustomers();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Resume failed"
      );

    }
  };


  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Customers</h1>

          <p>
            Manage tiffin customers and
            subscriptions.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            setShowAdd(!showAdd)
          }
        >
          + Add Customer
        </button>

      </div>


      {showAdd && (

        <form
          className="form-card"
          onSubmit={handleAddCustomer}
        >

          <h2>Add Customer</h2>

          <input
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                name: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Phone Number"
            value={newCustomer.phone}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                phone: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Address"
            value={newCustomer.address}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                address: e.target.value,
              })
            }
          />

          <button className="primary-btn">
            Save Customer
          </button>

        </form>

      )}


      <div className="search-row">

        <input
          className="search-input"
          placeholder="Search by customer name or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

      </div>


      <div className="table-card">

        {loading ? (

          <p>Loading customers...</p>

        ) : (

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {customers.map((customer) => {

                const subscription =
                  customer.subscription;

                return (

                  <tr key={customer._id}>

                    <td>
                      {customer.name}
                    </td>

                    <td>
                      {customer.phone}
                    </td>

                    <td>
                      {customer.address || "-"}
                    </td>

                    <td>

                      {!subscription ? (

                        <span className="status">
                          NOT SUBSCRIBED
                        </span>

                      ) : (

                        <span
                          className={`status ${
                            subscription.status
                              .toLowerCase()
                          }`}
                        >
                          {subscription.status}
                        </span>

                      )}

                    </td>

                    <td>

                      {!subscription && (

                        <button
                          onClick={() =>
                            subscribe(
                              customer._id
                            )
                          }
                        >
                          Subscribe
                        </button>

                      )}

                      {subscription?.status ===
                        "ACTIVE" && (

                        <button
                          onClick={() =>
                            pause(
                              subscription._id
                            )
                          }
                        >
                          Pause
                        </button>

                      )}

                      {subscription?.status ===
                        "PAUSED" && (

                        <button
                          onClick={() =>
                            resume(
                              subscription._id
                            )
                          }
                        >
                          Resume
                        </button>

                      )}

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        )}

      </div>


      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}
12. Billing.jsx
This connects to your most important API.

import { useState } from "react";

import {
  getCustomerBill,
} from "../services/api";

export default function Billing() {

  const [phone, setPhone] = useState("");

  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [bill, setBill] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const searchBill = async () => {

    if (!phone) {
      setError("Enter customer phone number");
      return;
    }

    setError("");
    setBill(null);
    setLoading(true);

    try {

      /*
       * If your billing API accepts customer ID,
       * first search customer by phone and then
       * call this API.
       *
       * This example assumes your backend can
       * resolve the customer ID separately.
       */

      const customerId =
        prompt(
          "Enter Customer ID for prototype"
        );

      if (!customerId) return;

      const response =
        await getCustomerBill(
          customerId,
          month
        );

      setBill(response.data);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to calculate bill"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="page">

      <h1>Monthly Billing</h1>

      <div className="billing-search">

        <input
          placeholder="Customer phone number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          type="month"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={searchBill}
        >
          Calculate Bill
        </button>

      </div>


      {error && (
        <div className="error">
          {error}
        </div>
      )}


      {loading && (
        <p>Calculating bill...</p>
      )}


      {bill && (

        <div className="bill-card">

          <h2>Monthly Bill</h2>

          <div className="bill-row">
            <span>Customer</span>
            <strong>
              {bill.customer}
            </strong>
          </div>

          <div className="bill-row">
            <span>Plan</span>
            <strong>
              {bill.plan}
            </strong>
          </div>

          <div className="bill-row">
            <span>Monthly Price</span>
            <strong>
              ₹{bill.monthlyPrice}
            </strong>
          </div>

          <div className="bill-row">
            <span>Total Weekdays</span>
            <strong>
              {bill.totalWeekdays}
            </strong>
          </div>

          <div className="bill-row">
            <span>Paused Days</span>
            <strong>
              {bill.pausedDays}
            </strong>
          </div>

          <div className="bill-row">
            <span>Delivered Days</span>
            <strong>
              {bill.deliveredDays}
            </strong>
          </div>

          <div className="bill-row">
            <span>Daily Rate</span>
            <strong>
              ₹{bill.dailyRate}
            </strong>
          </div>

          <hr />

          <div className="bill-total">

            <span>Total Bill</span>

            <strong>
              ₹{bill.totalBill}
            </strong>

          </div>

        </div>

      )}

    </div>
  );
}
One change I would make to the billing API
Since the requirement says customers are looked up by phone, make your backend support:

GET /api/billing?phone=9876543210&month=2026-09
Then the frontend becomes much cleaner:

const response = await getBilling({
  phone,
  month,
});

setBill(response.data);
You don't need the ugly prompt() for Customer ID.

13. Basic index.css
This gives you a clean prototype UI without spending too much time on design.

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f6f8;
  color: #222;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
}

.navbar {
  height: 65px;
  background: #171717;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.logo span {
  color: #d69b38;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
}

.nav-links a:hover {
  color: #d69b38;
}

.user-name {
  color: #ccc;
}

.logout-btn {
  background: #333;
  color: white;
}

.page {
  max-width: 1200px;
  margin: auto;
  padding: 35px 25px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.primary-btn {
  background: #171717;
  color: white;
  padding: 12px 22px;
}

.primary-btn:hover {
  background: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px #ddd;
}

.stat-card span {
  display: block;
  color: #777;
  margin-bottom: 10px;
}

.stat-card strong {
  font-size: 30px;
}

.dashboard-card,
.form-card,
.table-card,
.bill-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px #ddd;
}

.form-card {
  max-width: 500px;
}

.form-card input,
.auth-card input,
.search-input,
.billing-search input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 12px;
}

.search-row {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 14px;
  border-bottom: 1px solid #eee;
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  background: #eee;
}

.status.active {
  background: #dff5e4;
  color: #187333;
}

.status.paused {
  background: #fff0d5;
  color: #9a6200;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
}

.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-card {
  width: 400px;
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 4px 20px #ddd;
}

.auth-card h2 {
  margin-bottom: 25px;
}

.error {
  background: #ffe5e5;
  color: #a00;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.hero {
  min-height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #171717;
  color: white;
}

.hero-content {
  max-width: 750px;
}

.hero h1 {
  font-size: 55px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 19px;
  color: #ccc;
  margin-bottom: 30px;
}

.features,
.audience,
.next-features {
  padding: 70px 10%;
  text-align: center;
}

.feature-grid {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 25px;
  margin-top: 35px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
}

.billing-search {
  display: flex;
  gap: 15px;
  max-width: 800px;
  margin: 30px 0;
}

.billing-search input {
  margin: 0;
}

.bill-card {
  max-width: 600px;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.bill-total {
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  padding-top: 15px;
}

@media (max-width: 768px) {

  .stats-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .navbar {
    padding: 0 15px;
  }

  .nav-links {
    gap: 8px;
  }

  .user-name {
    display: none;
  }

  .hero h1 {
    font-size: 38px;
  }

  .billing-search {
    flex-direction: column;
  }

  .table-card {
    overflow-x: auto;
  }
}
One small backend adjustment
For the frontend I gave you, I'd make billing search by phone and return the subscription with the customer from your customer API. That gives you this clean prototype flow:

CUSTOMERS PAGE

Search: 9876543210
       ↓
GET /api/customers?search=9876543210
       ↓
Customer + subscription status
       ↓
ACTIVE / PAUSED
Then:

BILLING PAGE

Phone: 9876543210
Month: September 2026
       ↓
GET /api/billing?phone=9876543210&month=2026-09
       ↓
Backend billingCalculator.js
       ↓
Bill displayed
I would build the backend to exactly match this frontend contract, rather than creating extra APIs. This will keep the assignment prototype small and make the final GitHub project much easier to understand and demonstrate.


now there is a twist i have to implement Twists for this problem

Level 1 — T1 (integrate): “Each morning, notify the customers due a delivery today (active, a weekday, not paused) via the Notification Service.” Graded via /outbox after POST /clock.
Level 2 — T6 (lifecycle): “Transfer a subscription to a new customer mid-cycle; the plan and cycle carry over, billing splits by who was served.”
Level 3 — T4 (messy data): “Import a messy customer list (dup phones, mixed date formats, blanks) into clean subscriptions with an { imported, deduped, rejected } report.” break down these and tell me how to implement these

Yes. These twists change the prototype significantly, but you still don't need a full production application. The key is to implement the three twist workflows cleanly and make them easy to demonstrate.

I would treat them as three independent business modules around your existing subscription/billing system.

Overall architecture after the twists
                    ┌─────────────────────┐
                    │      React UI       │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                    ┌──────────▼──────────┐
                    │   Node / Express    │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   T1 Notifications       T6 Transfer          T4 Import
          │                    │                    │
          ▼                    ▼                    ▼
      Outbox              Subscription        Import Report
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                           MongoDB
The three twists are:

Twist	Main challenge	What evaluator will test
T1	Today's delivery + notification	POST /clock → /outbox
T6	Mid-cycle ownership transfer	Billing split between old/new customer
T4	Dirty imported data	Import → dedupe → reject → report
T1 — Morning Delivery Notifications
Requirement
Each morning, notify customers due a delivery today: active + weekday + not paused.

The important part is that they explicitly say:

Graded via /outbox after POST /clock

So don't overcomplicate this with real WhatsApp/SMS/email.

You need to demonstrate:

POST /clock
      ↓
Determine today's date
      ↓
Find subscriptions
      ↓
Is today a service day?
      ↓
Is subscription ACTIVE?
      ↓
Is customer paused?
      ↓
YES
      ↓
Create notification in OUTBOX
This is essentially an outbox pattern: the application records the message in its database, and a separate sender could later deliver it. This avoids coupling the business transaction directly to an external notification service. 

T1 Database
Add an Outbox collection.

Outbox.js
const mongoose = require("mongoose");

const outboxSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["DELIVERY_NOTIFICATION"],
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Outbox", outboxSchema);
T1 API
You only need two special APIs.

Simulate morning
POST /api/clock
Example:

{
  "date": "2026-09-17"
}
This makes your application deterministic.

You don't want your evaluator to depend on the actual current date.

View Outbox
GET /api/outbox
Response:

{
  "count": 2,
  "messages": [
    {
      "customer": "Rahul Sharma",
      "phone": "9876543210",
      "message": "Your tiffin is scheduled for delivery today.",
      "deliveryDate": "2026-09-17",
      "status": "PENDING"
    }
  ]
}
T1 Business Logic
Suppose:

17 September 2026
Thursday
Customers:

Rahul     ACTIVE     Not paused       → Notify
Amit      ACTIVE     Paused            → Don't notify
Neha      PAUSED     Not paused        → Don't notify
Ravi      ACTIVE     Not service day   → Don't notify
Only Rahul gets an outbox message.

Pseudo-code:

for (const subscription of subscriptions) {

  if (subscription.status !== "ACTIVE") {
    continue;
  }

  if (!isServiceDay(subscription.plan, today)) {
    continue;
  }

  if (isPaused(subscription, today)) {
    continue;
  }

  await Outbox.create({
    type: "DELIVERY_NOTIFICATION",
    customerId: subscription.customerId,
    subscriptionId: subscription._id,
    phone: customer.phone,
    message: `Your tiffin is scheduled for delivery today.`,
    deliveryDate: today,
  });
}
Important
Make /clock idempotent.

If the evaluator does:

POST /clock
POST /clock
POST /clock
you shouldn't create three notifications.

Add a unique key such as:

subscriptionId + deliveryDate + type
and enforce uniqueness with a MongoDB index.

outboxSchema.index(
  {
    subscriptionId: 1,
    deliveryDate: 1,
    type: 1,
  },
  {
    unique: true,
  }
);
This is a good detail to mention in REASONING.md.

T6 — Transfer Subscription Mid-Cycle
This one is more interesting.

Requirement:

Transfer a subscription to a new customer mid-cycle; the plan and cycle carry over, billing splits by who was served.

Imagine:

Monthly plan = ₹3,000

Cycle:
1 Sep → 30 Sep

Old customer:
Rahul

Transfer:
16 Sep

New customer:
Amit
You now have:

1 Sep ───────── 15 Sep | 16 Sep ───────── 30 Sep
       Rahul                    Amit
Billing becomes:

Rahul → days served from 1–15
Amit  → days served from 16–30
Important design decision for T6
Do NOT overwrite the old customer ID.

Don't do this:

subscription.customerId = newCustomerId;
because then you lose the information about who received service before the transfer.

Instead, add a transfer history.

Updated Subscription Schema
I would modify your existing schema:

const transferSchema = new mongoose.Schema(
  {
    fromCustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    toCustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    effectiveDate: {
      type: Date,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);
Then:

const subscriptionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    cycleEndDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED", "CANCELLED"],
      default: "ACTIVE",
    },

    pauses: {
      type: [pauseSchema],
      default: [],
    },

    transfers: {
      type: [transferSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
T6 API
You need only one new API.

POST /api/subscriptions/:id/transfer
Request:

{
  "newCustomerId": "66abc123",
  "effectiveDate": "2026-09-16"
}
Response:

{
  "message": "Subscription transferred successfully",
  "subscriptionId": "123",
  "previousCustomer": "Rahul Sharma",
  "newCustomer": "Amit Sharma",
  "effectiveDate": "2026-09-16"
}
T6 Validation
The backend should reject:

Transfer before subscription starts
Subscription: 1 Sep
Transfer: 25 Aug

❌ Invalid
Transfer after cycle ends
Cycle: 1 Sep → 30 Sep
Transfer: 2 Oct

❌ Invalid
Transfer to same customer
Rahul → Rahul

❌ Invalid
Transfer twice on same date
16 Sep Rahul → Amit
16 Sep Rahul → Neha

❌ Invalid
For the prototype, you can keep the rule:

One subscription can have one transfer during a cycle.

That makes the implementation much simpler.

T6 Billing
This is the critical part.

Suppose:

Cycle:
1 Sep → 30 Sep

Transfer:
16 Sep
Your billing calculator creates two ownership periods:

Rahul:
1 Sep → 15 Sep

Amit:
16 Sep → 30 Sep
Then calculate service days separately.

For example:

Rahul
11 service days
₹3000 / 22 × 11
= ₹1500

Amit
11 service days
₹3000 / 22 × 11
= ₹1500
So:

September Bill

Rahul Sharma     ₹1,500
Amit Sharma      ₹1,500

Total            ₹3,000
If pauses occur, calculate them within each customer's ownership period.

T6 Billing Response
I'd make:

GET /api/billing/subscription/:id?month=2026-09
return:

{
  "cycle": {
    "start": "2026-09-01",
    "end": "2026-09-30"
  },

  "plan": {
    "name": "Monthly Lunch",
    "price": 3000
  },

  "transfers": [
    {
      "customer": "Rahul Sharma",
      "from": "2026-09-01",
      "to": "2026-09-15",
      "servedDays": 11,
      "amount": 1500
    },
    {
      "customer": "Amit Sharma",
      "from": "2026-09-16",
      "to": "2026-09-30",
      "servedDays": 11,
      "amount": 1500
    }
  ],

  "total": 3000
}
That makes T6 very easy for the evaluator to understand.

T4 — Messy Customer Import
This is a completely different problem.

Requirement:

Import a messy customer list with duplicate phones, mixed date formats and blanks into clean subscriptions with an { imported, deduped, rejected } report.

You should think of this as:

CSV / JSON
    ↓
Parse
    ↓
Normalize
    ↓
Validate
    ↓
Deduplicate
    ↓
Create Customer
    ↓
Create Subscription
    ↓
Generate Import Report
Example messy CSV
Your evaluator might give something conceptually like:

name,phone,startDate,plan
Rahul Sharma,9876543210,01/09/2026,Monthly Lunch
Rahul S,9876543210,2026-09-01,Monthly Lunch
Amit Kumar,9988776655,9-2-2026,Monthly Lunch
Neha,,2026-09-01,Monthly Lunch
,,,
Ravi,8877665544,invalid,Monthly Lunch
This has:

Rahul       → duplicate phone
Amit        → different date format
Neha        → missing phone
blank row   → blank
Ravi        → invalid date
T4 Import API
Keep it simple:

POST /api/import/customers
Use multipart/form-data.

Upload:

customers.csv
You can use multer.

T4 Required Report
The API should return exactly the three categories:

{
  "imported": [
    {
      "name": "Rahul Sharma",
      "phone": "9876543210"
    },
    {
      "name": "Amit Kumar",
      "phone": "9988776655"
    }
  ],

  "deduped": [
    {
      "phone": "9876543210",
      "row": 2,
      "reason": "Duplicate phone number"
    }
  ],

  "rejected": [
    {
      "row": 4,
      "reason": "Phone number is missing"
    },
    {
      "row": 6,
      "reason": "Invalid start date"
    }
  ]
}
T4 What Does "Deduped" Mean?
Suppose:

Row 1:
Rahul Sharma | 9876543210 | 01/09/2026

Row 2:
Rahul S      | 9876543210 | 2026-09-01
Both have:

9876543210
Keep the first valid record.

imported = 1
deduped = 1
Don't create two customers.

T4 Normalization
Create:

utils/importNormalizer.js
Phone normalization
Input:

+91 98765 43210
09876543210
9876543210
Normalize to:

9876543210
For the prototype, you can support:

function normalizePhone(phone) {

  if (!phone) return null;

  let value = String(phone)
    .replace(/\D/g, "");

  if (value.startsWith("91") &&
      value.length === 12) {
    value = value.substring(2);
  }

  if (value.length === 11 &&
      value.startsWith("0")) {
    value = value.substring(1);
  }

  if (!/^[6-9]\d{9}$/.test(value)) {
    return null;
  }

  return value;
}
T4 Date Normalization
Support the formats you expect:

01/09/2026
2026-09-01
09-01-2026
1 Sep 2026
Convert everything internally to:

Date
Don't store different string formats in MongoDB.

For the assignment, I'd use a date parsing library such as dayjs with the custom parse format plugin, or date-fns.

T4 Validation Rules
I'd implement these:

Required
name
phone
startDate
Missing any of these:

REJECTED
Phone
Must become:

10-digit Indian number
Otherwise:

REJECTED
Date
Must be parseable.

Otherwise:

REJECTED
Duplicate phone
If phone already appeared in the same import:

DEDUPED
If phone already exists in MongoDB:

DEDUPED
or, better for reporting clarity:

deduped:
"Customer already exists"
Plan
If plan doesn't exist:

REJECTED
T4 Import Algorithm
The logic should look like:

for (const row of rows) {

  // 1. Normalize
  const phone = normalizePhone(row.phone);
  const date = normalizeDate(row.startDate);

  // 2. Validate
  if (!row.name) {
    rejected.push(...);
    continue;
  }

  if (!phone) {
    rejected.push(...);
    continue;
  }

  if (!date) {
    rejected.push(...);
    continue;
  }

  // 3. Duplicate within file
  if (seenPhones.has(phone)) {
    deduped.push(...);
    continue;
  }

  seenPhones.add(phone);

  // 4. Check database
  const existing = await Customer.findOne({
    userId,
    phone
  });

  if (existing) {
    deduped.push(...);
    continue;
  }

  // 5. Create customer
  const customer = await Customer.create({
    name: row.name.trim(),
    phone,
    userId
  });

  // 6. Create subscription
  await Subscription.create({
    customerId: customer._id,
    planId,
    userId,
    startDate: date,
    cycleEndDate: calculateCycleEnd(date)
  });

  // 7. Report success
  imported.push(...);
}
Your New Folder Structure
Now I would modify the earlier prototype structure to this:

backend/
│
└── src/
    │
    ├── server.js
    │
    ├── config/
    │   └── db.js
    │
    ├── models/
    │   ├── User.js
    │   ├── Customer.js
    │   ├── Plan.js
    │   ├── Subscription.js
    │   └── Outbox.js             ← T1
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── customerController.js
    │   ├── subscriptionController.js
    │   ├── billingController.js
    │   ├── clockController.js   ← T1
    │   └── importController.js  ← T4
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── customerRoutes.js
    │   ├── subscriptionRoutes.js
    │   ├── billingRoutes.js
    │   ├── clockRoutes.js       ← T1
    │   └── importRoutes.js      ← T4
    │
    ├── services/
    │   ├── billingService.js
    │   ├── notificationService.js ← T1
    │   ├── transferService.js     ← T6
    │   └── importService.js       ← T4
    │
    ├── utils/
    │   ├── billingCalculator.js
    │   ├── dateUtils.js
    │   ├── importNormalizer.js
    │   └── phoneUtils.js
    │
    └── middleware/
        ├── authMiddleware.js
        └── uploadMiddleware.js    ← T4
Frontend Changes
You don't need a huge frontend.

Add only three screens/components:

pages/
│
├── Dashboard.jsx
├── Customers.jsx
├── Billing.jsx
│
├── Notifications.jsx      ← T1
├── TransferSubscription.jsx ← T6
└── ImportCustomers.jsx    ← T4
T1 UI
Simple:

┌────────────────────────────────────┐
│ Morning Delivery Notifications     │
│                                    │
│ Date: [17 Sep 2026]                │
│                                    │
│ [ Simulate Morning ]               │
│                                    │
│ Notifications Created: 3          │
│                                    │
│ Rahul     9876543210   PENDING    │
│ Amit      9988776655   PENDING    │
│ Neha      8877665544   PENDING    │
└────────────────────────────────────┘
Button:

POST /api/clock
Then:

GET /api/outbox
and display the results.

T6 UI
On subscription details:

┌────────────────────────────────────┐
│ Subscription                       │
│                                    │
│ Customer: Rahul Sharma             │
│ Plan: Monthly Lunch                │
│ Cycle: 01 Sep - 30 Sep             │
│                                    │
│ [ Transfer Subscription ]          │
└────────────────────────────────────┘
Modal:

Transfer Subscription

New Customer
[ Amit Sharma ▼ ]

Effective Date
[ 16-09-2026 ]

[ Transfer ]
Then display:

Transfer History

Rahul Sharma
01 Sep → 15 Sep

Amit Sharma
16 Sep → 30 Sep
T4 UI
Very simple:

┌────────────────────────────────────────┐
│ Import Customers                       │
│                                        │
│ Upload CSV                             │
│ [ Choose File ]                        │
│                                        │
│ [ Import ]                             │
│                                        │
├────────────────────────────────────────┤
│ IMPORT SUMMARY                         │
│                                        │
│ Imported       18                      │
│ Deduped         5                      │
│ Rejected        3                      │
│                                        │
│ [ View Details ]                       │
└────────────────────────────────────────┘
That's enough.

Final API List
Your complete prototype API set becomes:

Authentication
POST   /api/auth/register
POST   /api/auth/login
Customers
POST   /api/customers
GET    /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
Subscription
POST   /api/subscriptions
POST   /api/subscriptions/:id/pause
POST   /api/subscriptions/:id/resume
POST   /api/subscriptions/:id/transfer     ← T6
Billing
GET    /api/billing?phone=...&month=...
GET    /api/billing/subscription/:id
T1
POST   /api/clock
GET    /api/outbox
T4
POST   /api/import/customers
That's only 15 endpoints, and several are very simple.

How I would implement the twists
Don't try to build everything simultaneously.

Step 1 — Existing core
Auth
 ↓
Customer
 ↓
Subscription
 ↓
Pause/Resume
 ↓
Billing
Step 2 — T1
Outbox model
 ↓
/clock
 ↓
Delivery eligibility
 ↓
Notifications
 ↓
/outbox
Step 3 — T6
Transfer history
 ↓
Transfer API
 ↓
Billing ownership periods
 ↓
Split bill
Step 4 — T4
CSV upload
 ↓
Parse
 ↓
Normalize
 ↓
Validate
 ↓
Deduplicate
 ↓
Create Customer + Subscription
 ↓
Import report
The most important conceptual point is that T1, T6 and T4 are not three unrelated features. They all exercise the same subscription model from different angles:

                 SUBSCRIPTION
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
      T1             T6             T4
 Delivery          Transfer        Import
 Notification      Ownership       Clean Data
       │              │              │
       ▼              ▼              ▼
    Outbox         Billing         Customers
For T1, I would explicitly use an outbox collection rather than directly calling a notification provider; the outbox pattern is designed to persist the message alongside the business operation and let a separate process deliver it later. 

For your assignment, this is enough to look like a thoughtful full-stack prototype without turning it into a large production system.


edit the ffrntend part for the twist

Yes. For the twist requirements T1, T6 and T4, we should update the existing React frontend rather than rebuild it.

I’ll keep the existing Vite + React + Axios + React Router structure and add:

T1 – Morning Notifications

Select date

Simulate morning with POST /api/clock

Show notifications from /api/outbox

T6 – Transfer Subscription

Select existing subscription

Select new customer

Effective date

Transfer history

Calls POST /api/subscriptions/:id/transfer

T4 – Import Customers

CSV upload

Import button

Show imported / deduped / rejected

Show detailed rejected/duplicate rows

1. Updated frontend structure
Add these files:

frontend/
└── src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── CustomerForm.jsx
    │   ├── CustomerTable.jsx
    │   ├── SubscriptionModal.jsx
    │   ├── PauseModal.jsx
    │   ├── BillCard.jsx
    │   └── ProtectedRoute.jsx
    │
    ├── pages/
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── Customers.jsx
    │   ├── Billing.jsx
    │   ├── Notifications.jsx       // T1
    │   ├── TransferSubscription.jsx // T6
    │   └── ImportCustomers.jsx      // T4
    │
    ├── services/
    │   └── api.js
    │
    ├── context/
    │   └── AuthContext.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
2. Update services/api.js
Replace your API service with this version.

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   AUTH
========================= */

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getCurrentUser = () =>
  API.get("/auth/me");


/* =========================
   CUSTOMERS
========================= */

export const getCustomers = (params = {}) =>
  API.get("/customers", { params });

export const getCustomer = (id) =>
  API.get(`/customers/${id}`);

export const createCustomer = (data) =>
  API.post("/customers", data);

export const updateCustomer = (id, data) =>
  API.put(`/customers/${id}`, data);


/* =========================
   SUBSCRIPTIONS
========================= */

export const createSubscription = (data) =>
  API.post("/subscriptions", data);

export const pauseSubscription = (id, data) =>
  API.post(`/subscriptions/${id}/pause`, data);

export const resumeSubscription = (id, data) =>
  API.post(`/subscriptions/${id}/resume`, data);


/* =========================
   T6 TRANSFER
========================= */

export const transferSubscription = (id, data) =>
  API.post(`/subscriptions/${id}/transfer`, data);


/* =========================
   BILLING
========================= */

export const getBilling = (params = {}) =>
  API.get("/billing", { params });

export const getSubscriptionBill = (id, params = {}) =>
  API.get(`/billing/subscription/${id}`, { params });


/* =========================
   T1 NOTIFICATIONS
========================= */

export const simulateMorning = (date) =>
  API.post("/clock", { date });

export const getOutbox = (params = {}) =>
  API.get("/outbox", { params });


/* =========================
   T4 IMPORT
========================= */

export const importCustomers = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return API.post("/import/customers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default API;
3. Update App.jsx
Add the three new pages and routes.

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";

import Notifications from "./pages/Notifications";
import TransferSubscription from "./pages/TransferSubscription";
import ImportCustomers from "./pages/ImportCustomers";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Existing */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/billing" element={<Billing />} />

        {/* T1 */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* T6 */}
        <Route
          path="/transfer"
          element={<TransferSubscription />}
        />

        {/* T4 */}
        <Route
          path="/import"
          element={<ImportCustomers />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
4. Update Navbar.jsx
This gives you navigation for the twist features.

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="nav-brand">
        Tiffin Manager
      </div>

      <div className="nav-links">

        {token && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/customers">
              Customers
            </Link>

            <Link to="/billing">
              Billing
            </Link>

            <Link to="/notifications">
              Notifications
            </Link>

            <Link to="/transfer">
              Transfer
            </Link>

            <Link to="/import">
              Import
            </Link>

            <button
              className="nav-logout"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}
5. T1 — Notifications.jsx
This is the frontend for:

Each morning notify customers due for delivery today.

The important part is that the frontend doesn't decide who should receive a notification. It simply calls /clock; the backend determines eligible customers.

import { useEffect, useState } from "react";
import {
  simulateMorning,
  getOutbox
} from "../services/api";

export default function Notifications() {

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [date, setDate] = useState(today);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadNotifications = async () => {

    try {

      const res = await getOutbox({
        date
      });

      setNotifications(
        res.data.notifications ||
        res.data ||
        []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Unable to load notifications"
      );
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [date]);

  const handleMorning = async () => {

    setLoading(true);
    setMessage("");

    try {

      const res = await simulateMorning(date);

      setMessage(
        res.data.message ||
        "Morning notification process completed."
      );

      await loadNotifications();

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Morning simulation failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Morning Delivery Notifications</h1>

          <p>
            Notify customers who are due for lunch today.
          </p>
        </div>

      </div>


      <div className="card notification-control">

        <label>
          Delivery Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={handleMorning}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Simulate Morning"}
        </button>

      </div>


      {message && (
        <div className="success-message">
          {message}
        </div>
      )}


      <div className="card">

        <div className="card-header">

          <h2>
            Notifications
          </h2>

          <span className="count-badge">
            {notifications.length}
          </span>

        </div>


        {notifications.length === 0 ? (

          <div className="empty-state">
            No delivery notifications created for this date.
          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {notifications.map((item) => (

                  <tr key={item._id}>

                    <td>
                      {item.customerId?.name ||
                       item.customerName ||
                       "-"}
                    </td>

                    <td>
                      {item.phone}
                    </td>

                    <td>
                      {item.message}
                    </td>

                    <td>
                      {item.deliveryDate
                        ? new Date(
                            item.deliveryDate
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${
                          item.status?.toLowerCase()
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}
T1 UI flow
Notifications
────────────────────────────────

Delivery Date
[ 17-09-2026 ]

[ Simulate Morning ]

Notifications: 3

Rahul Sharma   9876543210   PENDING
Amit Kumar    9988776655   PENDING
Neha Gupta    8877665544   PENDING
This directly demonstrates the twist during the assignment demo.

6. T6 — TransferSubscription.jsx
This handles subscription transfer.

import { useEffect, useState } from "react";

import {
  getCustomers,
  transferSubscription
} from "../services/api";

export default function TransferSubscription() {

  const [customers, setCustomers] = useState([]);

  const [subscriptionId, setSubscriptionId] =
    useState("");

  const [newCustomerId, setNewCustomerId] =
    useState("");

  const [effectiveDate, setEffectiveDate] =
    useState("");

  const [currentCustomer, setCurrentCustomer] =
    useState("");

  const [cycleStart, setCycleStart] =
    useState("");

  const [cycleEnd, setCycleEnd] =
    useState("");

  const [transfers, setTransfers] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    loadCustomers();

  }, []);


  const loadCustomers = async () => {

    try {

      const res = await getCustomers({
        page: 1,
        limit: 100
      });

      setCustomers(
        res.data.customers ||
        res.data ||
        []
      );

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load customers"
      );

    }

  };


  /*
   * In the prototype the subscription information
   * can be loaded when the user selects a subscription.
   *
   * If your customer API returns subscription data,
   * call your subscription API here.
   */
  const handleTransfer = async () => {

    setMessage("");
    setError("");

    if (!subscriptionId) {
      setError("Enter subscription ID");
      return;
    }

    if (!newCustomerId) {
      setError("Select new customer");
      return;
    }

    if (!effectiveDate) {
      setError("Select effective date");
      return;
    }

    setLoading(true);

    try {

      const res = await transferSubscription(
        subscriptionId,
        {
          newCustomerId,
          effectiveDate
        }
      );

      setMessage(
        res.data.message ||
        "Subscription transferred successfully."
      );

      if (res.data.subscription) {

        const subscription =
          res.data.subscription;

        setCurrentCustomer(
          subscription.customerId?.name ||
          ""
        );

        setCycleStart(
          subscription.startDate
            ? subscription.startDate.substring(0, 10)
            : ""
        );

        setCycleEnd(
          subscription.cycleEndDate
            ? subscription.cycleEndDate.substring(0, 10)
            : ""
        );

        setTransfers(
          subscription.transfers || []
        );

      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Transfer failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Transfer Subscription</h1>

          <p>
            Transfer an active subscription to another
            customer during the current billing cycle.
          </p>
        </div>

      </div>


      <div className="card">

        <h2>Subscription Details</h2>

        <div className="form-grid">

          <div className="form-group">

            <label>
              Subscription ID
            </label>

            <input
              type="text"
              placeholder="Enter subscription ID"
              value={subscriptionId}
              onChange={(e) =>
                setSubscriptionId(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Current Customer
            </label>

            <input
              type="text"
              value={currentCustomer}
              readOnly
              placeholder="Loaded from subscription"
            />

          </div>


          <div className="form-group">

            <label>
              Cycle Start
            </label>

            <input
              type="date"
              value={cycleStart}
              readOnly
            />

          </div>


          <div className="form-group">

            <label>
              Cycle End
            </label>

            <input
              type="date"
              value={cycleEnd}
              readOnly
            />

          </div>

        </div>

      </div>


      <div className="card">

        <h2>Transfer Subscription</h2>

        <div className="form-grid">

          <div className="form-group">

            <label>
              New Customer
            </label>

            <select
              value={newCustomerId}
              onChange={(e) =>
                setNewCustomerId(e.target.value)
              }
            >

              <option value="">
                Select customer
              </option>

              {customers.map((customer) => (

                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name} - {customer.phone}
                </option>

              ))}

            </select>

          </div>


          <div className="form-group">

            <label>
              Effective Date
            </label>

            <input
              type="date"
              value={effectiveDate}
              onChange={(e) =>
                setEffectiveDate(e.target.value)
              }
            />

          </div>

        </div>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}


        <button
          className="primary-btn"
          onClick={handleTransfer}
          disabled={loading}
        >
          {loading
            ? "Transferring..."
            : "Transfer Subscription"}
        </button>

      </div>


      <div className="card">

        <h2>
          Transfer History
        </h2>

        {transfers.length === 0 ? (

          <div className="empty-state">
            No transfers yet.
          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>From Customer</th>
                  <th>To Customer</th>
                  <th>Effective Date</th>
                </tr>

              </thead>

              <tbody>

                {transfers.map((transfer) => (

                  <tr key={transfer._id}>

                    <td>
                      {transfer.fromCustomerId?.name ||
                       transfer.fromCustomerId}
                    </td>

                    <td>
                      {transfer.toCustomerId?.name ||
                       transfer.toCustomerId}
                    </td>

                    <td>
                      {new Date(
                        transfer.effectiveDate
                      ).toLocaleDateString("en-IN")}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}
Important T6 frontend point
Don't make the frontend calculate:

1 Sep → 15 Sep
16 Sep → 30 Sep
The backend should calculate this.

The frontend only sends:

{
  "newCustomerId": "...",
  "effectiveDate": "2026-09-16"
}
The backend then returns the transfer history and billing split.

7. T4 — ImportCustomers.jsx
Now the messy CSV import interface.

import { useState } from "react";

import {
  importCustomers
} from "../services/api";

export default function ImportCustomers() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleFileChange = (e) => {

    const selected =
      e.target.files?.[0];

    setFile(selected || null);

    setResult(null);
    setError("");
  };


  const handleImport = async () => {

    setError("");
    setResult(null);

    if (!file) {

      setError(
        "Please select a CSV file."
      );

      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {

      setError(
        "Please select a CSV file."
      );

      return;
    }

    setLoading(true);

    try {

      const res =
        await importCustomers(file);

      setResult(
        res.data
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Import failed."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1>
            Import Customers
          </h1>

          <p>
            Import customer subscriptions from
            a messy CSV file.
          </p>

        </div>

      </div>


      <div className="card import-card">

        <h2>
          Upload Customer CSV
        </h2>

        <p className="help-text">

          Supported fields:
          name, phone, startDate, plan

        </p>


        <div className="file-upload">

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />

        </div>


        {file && (

          <div className="selected-file">

            Selected:
            <strong>
              {file.name}
            </strong>

          </div>

        )}


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        <button
          className="primary-btn"
          onClick={handleImport}
          disabled={loading}
        >

          {loading
            ? "Importing..."
            : "Import Customers"}

        </button>

      </div>


      {result && (

        <>

          <div className="import-summary">

            <div className="summary-card imported">

              <span>
                Imported
              </span>

              <strong>
                {result.imported?.length || 0}
              </strong>

            </div>


            <div className="summary-card deduped">

              <span>
                Deduped
              </span>

              <strong>
                {result.deduped?.length || 0}
              </strong>

            </div>


            <div className="summary-card rejected">

              <span>
                Rejected
              </span>

              <strong>
                {result.rejected?.length || 0}
              </strong>

            </div>

          </div>


          {/* Imported */}

          {result.imported?.length > 0 && (

            <div className="card">

              <h2>
                Imported Customers
              </h2>

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                    </tr>

                  </thead>

                  <tbody>

                    {result.imported.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.name}
                          </td>

                          <td>
                            {item.phone}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* Deduped */}

          {result.deduped?.length > 0 && (

            <div className="card">

              <h2>
                Duplicate Records
              </h2>

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>Phone</th>
                      <th>Row</th>
                      <th>Reason</th>
                    </tr>

                  </thead>

                  <tbody>

                    {result.deduped.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.phone || "-"}
                          </td>

                          <td>
                            {item.row || "-"}
                          </td>

                          <td>
                            {item.reason}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* Rejected */}

          {result.rejected?.length > 0 && (

            <div className="card">

              <h2>
                Rejected Records
              </h2>

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>Row</th>
                      <th>Reason</th>
                    </tr>

                  </thead>

                  <tbody>

                    {result.rejected.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.row || "-"}
                          </td>

                          <td>
                            {item.reason}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </>

      )}

    </div>
  );
}
8. Add CSS for the new screens
Add this to your existing index.css.

/* =========================
   PAGE
========================= */

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
}

.page-header p {
  margin-top: 7px;
  color: #777;
}


/* =========================
   CARD
========================= */

.card {
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 22px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 20px;
}


/* =========================
   FORM
========================= */

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label,
.notification-control label {
  font-weight: 600;
  font-size: 14px;
}

.form-group input,
.form-group select,
.notification-control input {
  height: 44px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.notification-control input:focus {
  outline: none;
  border-color: #b89535;
}


/* =========================
   BUTTON
========================= */

.primary-btn {
  border: none;
  background: #222;
  color: white;
  padding: 12px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 18px;
}

.primary-btn:hover {
  background: #000;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


/* =========================
   NOTIFICATION
========================= */

.notification-control {
  display: flex;
  align-items: end;
  gap: 15px;
}

.notification-control input {
  width: 180px;
}

.notification-control .primary-btn {
  margin-top: 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.count-badge {
  background: #222;
  color: white;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 13px;
}


/* =========================
   TABLE
========================= */

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 13px 12px;
  text-align: left;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
}

th {
  background: #fafafa;
  font-weight: 600;
}

tr:hover td {
  background: #fcfcfc;
}


/* =========================
   STATUS
========================= */

.status-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending {
  background: #fff4d6;
  color: #8a6500;
}

.status-badge.sent {
  background: #e3f7e9;
  color: #18753b;
}

.status-badge.failed {
  background: #ffe6e6;
  color: #a50000;
}


/* =========================
   MESSAGES
========================= */

.success-message {
  background: #e8f7ed;
  color: #18753b;
  border: 1px solid #bde5c9;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.error-message {
  background: #fff0f0;
  color: #b00000;
  border: 1px solid #f0c0c0;
  padding: 12px 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.empty-state {
  text-align: center;
  padding: 35px;
  color: #888;
}


/* =========================
   IMPORT
========================= */

.import-card {
  max-width: 700px;
}

.help-text {
  color: #777;
  margin-bottom: 20px;
}

.file-upload {
  border: 2px dashed #ddd;
  border-radius: 10px;
  padding: 25px;
  background: #fafafa;
}

.selected-file {
  margin-top: 15px;
  color: #555;
}

.selected-file strong {
  margin-left: 7px;
}


/* =========================
   IMPORT SUMMARY
========================= */

.import-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 22px;
}

.summary-card {
  background: white;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-card span {
  color: #777;
  font-size: 14px;
}

.summary-card strong {
  font-size: 30px;
}

.summary-card.imported {
  border-left: 5px solid #29914c;
}

.summary-card.deduped {
  border-left: 5px solid #c18a00;
}

.summary-card.rejected {
  border-left: 5px solid #c52828;
}


/* =========================
   NAVBAR
========================= */

.navbar {
  height: 65px;
  padding: 0 30px;
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-size: 20px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.nav-links a:hover {
  color: #9a7722;
}

.nav-logout {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .navbar {
    height: auto;
    padding: 15px;
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .notification-control {
    align-items: stretch;
    flex-direction: column;
  }

  .notification-control input {
    width: auto;
  }

  .import-summary {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
9. One important improvement for T6
The transfer page above allows entering a subscription ID manually. For the actual assignment demo, I recommend making it easier:

Transfer Subscription

Subscription
[ Rahul Sharma - Monthly Lunch ▼ ]

Current customer: Rahul Sharma
Plan: Monthly Lunch
Cycle: 01 Sep 2026 → 30 Sep 2026

New Customer
[ Amit Kumar ▼ ]

Effective Date
[ 16 Sep 2026 ]

[ TRANSFER SUBSCRIPTION ]
For this, add a subscription API:

GET /api/subscriptions
and in api.js:

export const getSubscriptions = (params = {}) =>
  API.get("/subscriptions", { params });
Then replace the manual Subscription ID input with a dropdown.

This is much better for the assignment evaluator because they can see the complete lifecycle without copying MongoDB IDs.

10. Update Dashboard
Your dashboard should now have three additional cards:

<div className="dashboard-grid">

  <div className="dashboard-card">
    <h3>Morning Notifications</h3>
    <p>Notify today's customers</p>
    <Link to="/notifications">
      Open
    </Link>
  </div>

  <div className="dashboard-card">
    <h3>Transfer Subscription</h3>
    <p>Transfer a customer mid-cycle</p>
    <Link to="/transfer">
      Open
    </Link>
  </div>

  <div className="dashboard-card">
    <h3>Import Customers</h3>
    <p>Import and clean CSV data</p>
    <Link to="/import">
      Open
    </Link>
  </div>

</div>
11. Final assignment flow
Your frontend will now demonstrate the complete requirement:

                    TIFFIN MANAGER
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Customers         Billing         Dashboard
        │
        ├── Add Customer
        ├── Search Phone
        ├── Subscribe
        ├── Pause
        └── Resume

                         │
              ┌──────────┼───────────┐
              │          │           │
             T1         T6          T4
              │          │           │
        Notifications  Transfer    Import CSV
              │          │           │
          /clock      /transfer    /import
              │          │           │
           Outbox    Split Billing  Report
T1 demo
Select 17-09-2026
        ↓
Simulate Morning
        ↓
POST /api/clock
        ↓
Backend checks:
ACTIVE
+ weekday
+ not paused
        ↓
Outbox
        ↓
3 notifications
T6 demo
Rahul
01 Sep ───────── 15 Sep
                     │
                     │ Transfer
                     ▼
Amit
16 Sep ───────── 30 Sep

        ↓

Billing

Rahul → 11 days
Amit  → 11 days
T4 demo
messy.csv
   ↓
Upload
   ↓
Normalize
   ↓
Validate
   ↓
Deduplicate
   ↓
Create customers
   ↓
Create subscriptions
   ↓
┌─────────────────────────┐
│ Imported : 18           │
│ Deduped  : 5            │
│ Rejected : 3            │
└─────────────────────────┘
One backend change is especially important before you run this: add GET /api/subscriptions so the T6 page can select subscriptions by customer name instead of requiring MongoDB IDs. That will make the prototype much more polished and demo-friendly.

