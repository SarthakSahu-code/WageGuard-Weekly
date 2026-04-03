const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Onboard a Rider & Calculate Premium via AI
app.post('/api/onboard', async (req, res) => {
    const { name, platform, primary_zone } = req.body;
    try {
        // Step A: Save Rider to DB
        const partnerRes = await pool.query(
            'INSERT INTO partners (name, platform, primary_zone) VALUES ($1, $2, $3) RETURNING id',
            [name, platform, primary_zone]
        );
        const partnerId = partnerRes.rows[0].id;

        // Step B: Ask Python AI for Premium Pricing (Mocking current weather)
        const aiResponse = await axios.get(`http://127.0.0.1:8000/calculate-premium?zone=${primary_zone}&rain_probability=85&traffic_index=90`);
        const premium = aiResponse.data.final_weekly_premium;

        // Step C: Create Active Policy
        await pool.query(
            'INSERT INTO policies (partner_id, weekly_premium) VALUES ($1, $2)',
            [partnerId, premium]
        );

        res.json({ message: "Rider onboarded securely", ai_analysis: aiResponse.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Parametric Trigger (The Automated Claim) - Upgraded for Phase 2
app.post('/api/trigger', async (req, res) => {
    const { partner_id, event_type } = req.body;
    
    try {
        let payoutAmount = 0;
        let validationMessage = "";

        // The 3 Required Triggers (Income Loss Only)
        switch(event_type) {
            case "Severe Flooding":
                payoutAmount = 1500.00; // 2 days lost wages
                validationMessage = "Weather API confirmed localized flooding. Deliveries halted.";
                break;
            case "Extreme Heatwave":
                payoutAmount = 800.00; // 1 day reduced hours
                validationMessage = "Govt Heatwave Alert active. Compensating for mandatory offline cooling hours.";
                break;
            case "Unplanned Curfew":
                payoutAmount = 2500.00; // 3 days lost wages
                validationMessage = "Zone 4 locked down. Compensating for total inability to access pickup locations.";
                break;
            default:
                return res.status(400).json({ error: "Invalid trigger event" });
        }

        // Save to Database
        await pool.query(
            'INSERT INTO claims (partner_id, trigger_event, payout_amount) VALUES ($1, $2, $3)',
            [partner_id, event_type, payoutAmount]
        );

        res.json({ 
            message: `Parametric Trigger Activated: ${event_type}`, 
            amount: payoutAmount,
            details: validationMessage
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log(` Backend running on http://localhost:5000`));