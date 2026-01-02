:root {
    --bg: #f5f7fa;
    --text: #333;
    --card: #fff;
    --accent: #4b6cb7;
    --success: #2ecc71;
    --warning: #f1c40f;
    --danger: #e74c3c;
    --gray: #95a5a6;
    --border: #eaeaea;
}

.dark-mode {
    --bg: #121212;
    --text: #e0e0e0;
    --card: #1f2937;
    --accent: #60a5fa;
    --success: #34d399;
    --warning: #fbbf24;
    --danger: #f87171;
    --gray: #9ca3af;
    --border: #374151;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; line-height: 1.6; transition: background 0.3s, color 0.3s; }

.container { max-width: 1400px; margin: 0 auto; padding: 20px; }

header {
    background: linear-gradient(135deg, var(--accent), #182848);
    color: white;
    padding: 25px 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

header h1 { font-size: 2.4rem; display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }

.year-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

#current-year { font-size: 3.5rem; font-weight: 800; color: #ffd166; }

.header-buttons { display: flex; gap: 10px; }

.streak-badge {
    background: var(--danger);
    padding: 6px 15px;
    border-radius: 20px;
    font-weight: 600;
    color: white;
}

.dashboard { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
@media (max-width: 1100px) { .dashboard { grid-template-columns: 1fr; } }

.calendar-container, .daily-checklist {
    background: var(--card);
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s;
}

.calendar-container:hover, .daily-checklist:hover { transform: translateY(-5px); }

.calendar-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border);
}

.btn-icon {
    background: var(--accent);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
}

.year-calendar { display: grid; grid-template-columns: repeat(4,1fr); gap: 15px; }
@media (max-width: 768px) { .year-calendar { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 480px) { .year-calendar { grid-template-columns: 1fr; } }

.month-container {
    background: var(--bg);
    border-radius: 10px;
    padding: 15px;
    border: 1px solid var(--border);
}

.month-header { font-weight: 600; margin-bottom: 10px; color: var(--accent); text-align: center; }

.month-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
