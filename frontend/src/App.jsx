import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing our new premium styles

function App() {
  const [status, setStatus] = useState("System Ready. Awaiting rider onboarding.");
  const [riderName, setRiderName] = useState("");
  const [zone, setZone] = useState("Indiranagar");
  const [activePolicy, setActivePolicy] = useState(null);

  // Your actual Codespaces backend URL
  const BASE_URL = 'https://symmetrical-bassoon-695x5xxxx964hq44-5000.app.github.dev/api';

  const onboardRider = async (e) => {
    e.preventDefault();
    setStatus("Calling Python AI Model for Dynamic Risk Profiling...");
    try {
        const res = await axios.post(`${BASE_URL}/onboard`, {
            name: riderName, platform: "Zomato", primary_zone: zone
        });
        setActivePolicy(res.data.ai_analysis);
        setStatus(`✅ Success! Rider onboarded securely to PostgreSQL.`);
    } catch (err) {
        setStatus("❌ Error: Could not connect to backend.");
    }
  };

  const triggerClaim = async (eventType) => {
    setStatus(`📡 Monitoring Weather APIs... ${eventType.toUpperCase()} DETECTED.`);
    try {
        const res = await axios.post(`${BASE_URL}/trigger`, {
            partner_id: 1, event_type: eventType
        });
        setStatus(`💰 Payout Initiated! ₹${res.data.amount} credited. Reason: ${res.data.details}`);
    } catch (err) {
        setStatus("❌ Error: Claim failed.");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="glass-panel">
        
        <div className="header">
            <h1>WageGuard</h1>
            <p>Next-Gen Income Protection for Gig Workers</p>
        </div>

        <div className="status-bar">
          <strong>System Log:</strong> {status}
        </div>

        <div className="dashboard-grid">
          
          {/* LEFT COLUMN: Onboarding & Policy */}
          <div className="left-column">
            {!activePolicy ? (
                <form onSubmit={onboardRider}>
                  <h3 className="section-title">1. Onboard Rider</h3>
                  <input type="text" placeholder="Enter Rider Name" value={riderName} onChange={(e) => setRiderName(e.target.value)} required className="input-field" />
                  <select value={zone} onChange={(e) => setZone(e.target.value)} className="input-field">
                      <option value="Indiranagar">Indiranagar (High Traffic Zone)</option>
                      <option value="Koramangala">Koramangala (Flood Prone Zone)</option>
                  </select>
                  <button type="submit" className="action-btn btn-primary">
                      Generate AI Premium Pricing
                  </button>
                </form>
            ) : (
                <div className="policy-card">
                    <h3 className="section-title">Active Weekly Policy</h3>
                    <p style={{ fontSize: '1.2rem', color: '#0f172a' }}><strong>Premium:</strong> ₹{activePolicy.final_weekly_premium} / week</p>
                    <p style={{ color: '#475569', lineHeight: '1.5' }}><strong>AI Analysis:</strong> {activePolicy.interpretation}</p>
                    <p style={{ color: '#10b981', fontWeight: 'bold', marginTop: '15px' }}>✓ Coverage Active</p>
                </div>
            )}
          </div>

          {/* RIGHT COLUMN: Triggers (Only visible after onboarding) */}
          <div className="right-column">
            <h3 className="section-title">2. Parametric Simulation</h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>Trigger API events to test zero-touch payouts for lost income.</p>
            
            <button onClick={() => triggerClaim('Severe Flooding')} className="action-btn btn-flood" disabled={!activePolicy}>
              🌊 Simulate Flooding Alert
            </button>
            
            <button onClick={() => triggerClaim('Extreme Heatwave')} className="action-btn btn-heat" disabled={!activePolicy}>
              ☀️ Simulate Heatwave Alert
            </button>
            
            <button onClick={() => triggerClaim('Unplanned Curfew')} className="action-btn btn-curfew" disabled={!activePolicy}>
              🚫 Simulate Zone Curfew
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;