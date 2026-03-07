# WageGuard-Weekly



WageGuard-Weekly :- Guidewire DEVTrails 2026

The Mission: AI-Powered Parametric Insurance for Food Delivery Partners
India's platform-based delivery partners are the backbone of the digital economy, yet external disruptions like extreme weather and social unrest can cause them to lose 20-30% of their monthly earnings.
Our platform is a parametric insurance safety net built exclusively for Food Delivery Partners (Zomato/Swiggy).

Coverage Scope: We strictly cover Loss of Income. We do not cover health, life, accidents, or vehicle repairs.

Platform Justification: Progressive Web App (PWA)
We are deploying a Mobile-Responsive Web Application (PWA).
 * For the Delivery Partner: A lightweight, mobile-first interface accessible directly via a browser, bypassing the friction of app store downloads while mirroring the native app experience.
 * For the Insurer: A comprehensive, data-heavy desktop dashboard for analytics and risk management.
   A single codebase ensures rapid iteration, vital for surviving the weekly burn rate and avoiding late-delivery elimination.

Workflow & Parametric Triggers
Our system operates on a zero-touch, automated workflow:
 * Onboarding & Risk Profiling: Delivery partner registers their primary operating zones.
 * Real-Time Monitoring: The backend continuously ingests localized API data.
 * Automated Triggering: Payouts are instantly initiated when specific thresholds are met, resulting in loss of income.

Defined Triggers:
 * Environmental: Extreme heat alerts, heavy rainfall (mm/hr threshold), and localized flooding that halt outdoor work.
 * Social: Unplanned curfews, localized strikes, or sudden zone closures preventing access to pickup/drop locations.
The Financial Model: Weekly Premium Structure
Gig workers operate on week-to-week payouts. Our financial model mirrors this reality with a Weekly Pricing Model. Premiums are calculated and deducted weekly, providing active coverage for the upcoming 7 days, avoiding long-term lock-ins that delivery partners cannot afford.

AI/ML Architecture (The 5-Star Differentiator)
To calculate dynamic weekly premiums and detect fraud, we are moving beyond basic regression and deploying Generative Interpretable Models for Early Prediction.
 * Dynamic Risk Profiling: The model handles the simultaneous prediction of multiple adverse outcomes (e.g., the probability of a severe rainstorm coinciding with peak traffic gridlock). By processing historical weather patterns and zonal traffic data, it dynamically adjusts the weekly premium—charging less for historically safe zones.
 * Interpretability as a Feature: In enterprise insurance, "black box" AI is a regulatory liability. Our interpretable architecture ensures that every dynamic pricing adjustment can be easily explained and audited.
 * Intelligent Fraud Detection: The AI cross-references incoming claims with historical data to flag delivery-specific fraud, such as GPS spoofing or fabricated weather claims, preventing duplicate or invalid payouts.

Tech Stack & Development Plan
Our architecture is designed for scale and rapid feature deployment:
 * Frontend: Mobile-Responsive Web (React / HTML-CSS-JS)
 * Backend: Node.js (Express) for robust API handling and real-time trigger monitoring.
 * Database: PostgreSQL for structuring relational data, handling user ledgers, and maintaining immutable audit trails of parametric events.
 * AI/ML Logic: Python-based predictive risk modeling using open-source libraries.
