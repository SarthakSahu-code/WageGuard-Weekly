const pool = require('./db');

const createTables = async () => {
    // Table 1: The Delivery Partners
    const partnerTable = `
        CREATE TABLE IF NOT EXISTS partners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            platform VARCHAR(50) NOT NULL,
            primary_zone VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Table 2: The Weekly Ledgers (Premiums)
    const policyTable = `
        CREATE TABLE IF NOT EXISTS policies (
            id SERIAL PRIMARY KEY,
            partner_id INTEGER REFERENCES partners(id),
            weekly_premium DECIMAL(5,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Table 3: The Parametric Trigger Events (Audit Trail)
    const claimTable = `
        CREATE TABLE IF NOT EXISTS claims (
            id SERIAL PRIMARY KEY,
            partner_id INTEGER REFERENCES partners(id),
            trigger_event VARCHAR(100) NOT NULL,
            payout_amount DECIMAL(7,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'paid',
            triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        console.log('⏳ Connecting to database to build tables...');
        
        // Execute the SQL commands
        await pool.query(partnerTable);
        await pool.query(policyTable);
        await pool.query(claimTable);
        
        console.log('✅ All WageGuard-Weekly database tables created successfully!');
    } catch (err) {
        console.error('❌ Error creating tables:', err);
    } finally {
        pool.end(); // Close the connection so the script finishes
    }
};

createTables();