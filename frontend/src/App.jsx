import { useState } from 'react';
import axios from 'axios';

function App() {
  const [status, setStatus] = useState("Waiting for action...");

  const onboardRider = async () => {
    setStatus("Calling AI Model for Risk Profiling...");
    const res = await axios.post('https://symmetrical-bassoon-695x5xxxx964hq44-5000.app.github.dev/api/onboard', {
      name: "Raju Delivery", platform: "Zomato", primary_zone: "Indiranagar"
    });
    setStatus(`Success! AI Premium: ₹${res.data.ai_analysis.final_weekly_premium} | Reason: ${res.data.ai_analysis.interpretation}`);
  };

  const triggerClaim = async () => {
    setStatus("Monitoring Weather API... FLOOD DETECTED.");
    const res = await axios.post('https://symmetrical-bassoon-695x5xxxx964hq44-5000.app.github.dev/api/trigger', {
      partner_id: 1, event_type: "Severe Flooding"
    });
    setStatus(res.data.message);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>WageGuard-Weekly (Phase 2 MVP)</h1>
      <p>Status: <b>{status}</b></p>
      
      <button onClick={onboardRider} style={{ padding: '10px', marginRight: '10px', background: '#007BFF', color: 'white', border: 'none' }}>
        1. Onboard Rider & AI Price
      </button>
      
      <button onClick={triggerClaim} style={{ padding: '10px', background: '#DC3545', color: 'white', border: 'none' }}>
        2. Simulate Weather Trigger (Payout)
      </button>
    </div>
  );
}

export default App;