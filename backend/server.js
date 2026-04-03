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

// 2. Parametric Trigger (The Automated Claim)
app.post('/api/trigger', async (req, res) => {
    const { partner_id, event_type } = req.body;
    try {
        const payoutAmount = 1000.00; // Fixed payout for income loss
        await pool.query(
            'INSERT INTO claims (partner_id, trigger_event, payout_amount) VALUES ($1, $2, $3)',
            [partner_id, event_type, payoutAmount]
        );
        res.json({ message: "Parametric Trigger Activated. Instant Payout Initiated.", amount: payoutAmount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log(` Backend running on http://localhost:5000`));