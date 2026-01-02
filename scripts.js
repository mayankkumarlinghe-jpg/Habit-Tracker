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

.day-cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;
}

.day-cell.empty { background: transparent; }

.day-cell.completed { background: var(--success); color: white; }
.day-cell.partial { background: var(--warning); color: #333; }
.day-cell.failed { background: var(--danger); color: white; }
.day-cell.future { background: #ecf0f1; color: var(--gray); }
.day-cell.today { border: 3px solid var(--accent); }

.checklist-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

.completion-stats { text-align: center; }

#completion-percent { font-size: 2.5rem; font-weight: 800; display: block; }

.progress-bar {
    background: var(--border);
    height: 10px;
    border-radius: 5px;
    margin-top: 8px;
    overflow: hidden;
}

#progress-fill {
    height: 100%;
    width: 0%;
    background: var(--success);
    transition: width 0.4s ease, background 0.3s;
}

.today-date {
    background: #e8f4fc;
    padding: 12px 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
}

.habit-item {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    margin-bottom: 12px;
    background: var(--card);
    border-radius: 10px;
    border-left: 5px solid var(--accent);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: all 0.3s;
}

.habit-item:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.1); }

.habit-item.locked { opacity: 0.7; border-left-color: var(--gray); }

.habit-checkbox { width: 22px; height: 22px; margin-right: 15px; accent-color: var(--success); }

.habit-label { flex: 1; font-size: 1.1rem; font-weight: 500; }

.checklist-actions { display: flex; gap: 15px; }

.btn-primary, .btn-success, .btn-secondary {
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex: 1;
    transition: all 0.3s;
}

.btn-primary { background: var(--accent); color: white; }
.btn-success { background: var(--success); color: white; }
.btn-secondary { background: var(--gray); color: white; }

.btn-primary:hover, .btn-success:hover, .btn-secondary:hover { transform: translateY(-2px); }

.analytics-section {
    background: var(--card);
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}


.charts-container { display: grid; grid-template-columns: repeat(3,1fr); gap: 25px; }
@media (max-width: 1200px) { .charts-container { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 768px) { .charts-container { grid-template-columns: 1fr; } }

.chart-box, .stats-box {
    background: var(--bg);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid var(--border);
}

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.stat-item {
    background: var(--card);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.stat-value { font-size: 2.5rem; font-weight: 800; margin-bottom: 8px; }
.stat-label { color: var(--gray); font-size: 0.9rem; }

.modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal.active { display: flex; }

.modal-content {
    background: var(--card);
    width: 90%;
    max-width: 700px;
    border-radius: 12px;
    overflow: hidden;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    background: linear-gradient(135deg, var(--accent), #182848);
    color: white;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-modal {
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}

.modal-body { padding: 25px 30px; overflow-y: auto; flex: 1; }

.modal-subtitle { color: var(--accent); font-weight: 600; margin: 20px 0 10px; }

.edit-habit-item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    margin-bottom: 10px;
    background: var(--bg);
    border-radius: 8px;
}

.edit-habit-item.default { border-left: 4px solid var(--success); }
.edit-habit-item.custom { border-left: 4px solid var(--warning); }

.remove-habit-btn {
    background: var(--danger);
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: auto;
    cursor: pointer;
}

.add-habit-form { display: flex; gap: 15px; margin-top: 25px; }

#new-habit-input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid var(--border);
    border-radius: 8px;
    background: var(--card);
    color: var(--text);
}

.modal-footer {
    padding: 20px 30px;
    background: var(--bg);
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    border-top: 1px solid var(--border);
}

footer {
    margin-top: 40px;
    text-align: center;
    color: var(--gray);
    padding-top: 20px;
    border-top: 1px solid var(--border);
}
