# WageGuard-Weekly



**WageGuard-Weekly :- Guidewire DEVTrails 2026**

**The Mission: AI-Powered Parametric Insurance for Food Delivery Partners**
India's platform-based delivery partners are the backbone of the digital economy, yet external disruptions like extreme weather and social unrest can cause them to lose 20-30% of their monthly earnings.
Our platform is a parametric insurance safety net built exclusively for Food Delivery Partners (Zomato/Swiggy).

**Coverage Scope**: We strictly cover Loss of Income. We do not cover health, life, accidents, or vehicle repairs.

**Platform Justification: Progressive Web App (PWA)**
We are deploying a Mobile-Responsive Web Application (PWA).
 * For the Delivery Partner: A lightweight, mobile-first interface accessible directly via a browser, bypassing the friction of app store downloads while mirroring the native app experience.
 * For the Insurer: A comprehensive, data-heavy desktop dashboard for analytics and risk management.
   A single codebase ensures rapid iteration, vital for surviving the weekly burn rate and avoiding late-delivery elimination.

**Workflow & Parametric Triggers**
Our system operates on a zero-touch, automated workflow:
 * Onboarding & Risk Profiling: Delivery partner registers their primary operating zones.
 * Real-Time Monitoring: The backend continuously ingests localized API data.
 * Automated Triggering: Payouts are instantly initiated when specific thresholds are met, resulting in loss of income.

**Defined Triggers:**
 * Environmental: Extreme heat alerts, heavy rainfall (mm/hr threshold), and localized flooding that halt outdoor work.
 * Social: Unplanned curfews, localized strikes, or sudden zone closures preventing access to pickup/drop locations.
The Financial Model: Weekly Premium Structure
Gig workers operate on week-to-week payouts. Our financial model mirrors this reality with a Weekly Pricing Model. Premiums are calculated and deducted weekly, providing active coverage for the upcoming 7 days, avoiding long-term lock-ins that delivery partners cannot afford.

**AI/ML Architecture (The 5-Star Differentiator)**
To calculate dynamic weekly premiums and detect fraud, we are moving beyond basic regression and deploying Generative Interpretable Models for Early Prediction.
 * Dynamic Risk Profiling: The model handles the simultaneous prediction of multiple adverse outcomes (e.g., the probability of a severe rainstorm coinciding with peak traffic gridlock). By processing historical weather patterns and zonal traffic data, it dynamically adjusts the weekly premium—charging less for historically safe zones.
 * Interpretability as a Feature: In enterprise insurance, "black box" AI is a regulatory liability. Our interpretable architecture ensures that every dynamic pricing adjustment can be easily explained and audited.
 * Intelligent Fraud Detection: The AI cross-references incoming claims with historical data to flag delivery-specific fraud, such as GPS spoofing or fabricated weather claims, preventing duplicate or invalid payouts.

## Technical Architecture
WageGuard operates on a robust, multi-service cloud architecture designed for scalability:
1. **Frontend (React + Vite):** A modern, responsive dashboard for onboarding riders and simulating parametric triggers.
2. **Backend (Node.js + Express):** The central orchestrator that securely handles API routing and database connections.
3. **AI Pricing Engine (Python + FastAPI):** A microservice that ingests rider data and environmental variables to output dynamic, interpretable weekly premiums.
4. **Database (PostgreSQL):** A relational database maintaining an immutable audit trail of `partners`, active `policies`, and automated `claims`.

## Running the Project Locally (Codespaces Environment)

This project is optimized for GitHub Codespaces. To spin up the full architecture, follow these steps in separate terminal tabs:

### 1. The Database (PostgreSQL)
Ensure PostgreSQL is installed and the `postgres` user is set up. Initialize the schema:
```bash
cd backend
node initDb.js
```
### 2. The AI Microservice (Python/FastAPI)
Activate the virtual environment and start the pricing engine on Port 8000:
```bash
cd ml-service
source venv/bin/activate
uvicorn main:app --reload --port 8000
```
### 3. The Node.js Backend
Start the Express server on Port 5000:
```bash
cd backend
node server.js
```
### 4. The React Frontend
Install dependencies and start the Vite development server on Port 5173:
```bash
cd frontend
npm install axios
npm run dev
```

(Note: If running in GitHub Codespaces, ensure all forwarded ports [5000, 5173, 8000] are set to Public visibility in the Ports tab to prevent CORS policy blocks).
