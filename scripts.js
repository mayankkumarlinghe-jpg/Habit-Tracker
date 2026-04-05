// =============================================
// ENHANCED HABIT TRACKER - January 2026
// =============================================

let appState = {
    currentYear: 2026,
    selectedYear: 2026,
    habits: [],
    habitData: {},
    points: 0,
    today: '2026-01-02'  // Fixed date as per requirement
};

const DEFAULT_HABITS = [
    "Wake up early",
    "Go to gym",
    "Drink 12 glasses of water",
    "3 hours productivity work",
    "1 hour coding",
    "Cold shower",
    "Meditation (30 minutes)",
    "Pushed a GitHub repo",
    "Won today (reflection tick)"
];

const elements = {
    currentYear: document.getElementById('current-year'),
    yearTitle: document.getElementById('year-title'),
    currentDate: document.getElementById('current-date'),
    todayDate: document.getElementById('today-date'),
    streakCounter: document.getElementById('streak-counter'),
    completionPercent: document.getElementById('completion-percent'),
    progressFill: document.getElementById('progress-fill'),
    habitsList: document.getElementById('habits-list'),
    yearCalendar: document.getElementById('year-calendar'),
    prevYearBtn: document.getElementById('prev-year'),
    nextYearBtn: document.getElementById('next-year'),
    saveTodayBtn: document.getElementById('save-today-btn'),
    editHabitsBtn: document.getElementById('edit-habits-btn'),
    editHabitsModal: document.getElementById('edit-habits-modal'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    defaultHabitsList: document.getElementById('default-habits-list'),
    customHabitsList: document.getElementById('custom-habits-list'),
    newHabitInput: document.getElementById('new-habit-input'),
    addHabitBtn: document.getElementById('add-habit-btn'),
    saveHabitsBtn: document.getElementById('save-habits-btn'),
    monthlyChart: document.getElementById('monthly-chart'),
    habitChart: document.getElementById('habit-chart'),
    totalCompleted: document.getElementById('total-completed'),
    currentStreak: document.getElementById('current-streak'),
    bestStreak: document.getElementById('best-streak'),
    totalPoints: document.getElementById('total-points'),
    monthlyAvg: document.getElementById('monthly-avg'),
    yearlyAvg: document.getElementById('yearly-avg'),
    footerYear: document.getElementById('footer-year'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    exportBtn: document.getElementById('export-btn'),
    importBtn: document.getElementById('import-btn'),
    importFile: document.getElementById('import-file')
};

let monthlyChartInstance = null;
let habitChartInstance = null;

// =============================================
// INITIALIZATION
// =============================================

function initializeApp() {
    elements.currentDate.textContent = "Friday, January 2, 2026";
    elements.todayDate.textContent = "Today, Friday, January 2, 2026";
    elements.footerYear.textContent = appState.currentYear;

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    loadHabits();
    loadHabitData();
    loadPoints();

    setupEventListeners();
    renderYearCalendar();
    renderHabitsList();
    updateStats();
    renderCharts();
    updateCompletionPercentage();
}

// =============================================
// DATA PERSISTENCE
// =============================================

function loadHabits() {
    const saved = localStorage.getItem('habitTracker_habits');
    appState.habits = saved ? JSON.parse(saved) : [...DEFAULT_HABITS];
    saveHabits();
}

function saveHabits() {
    localStorage.setItem('habitTracker_habits', JSON.stringify(appState.habits));
}


function loadHabitData() {
    const saved = localStorage.getItem('habitTracker_data');
    appState.habitData = saved ? JSON.parse(saved) : {};
}

function saveHabitData() {
    localStorage.setItem('habitTracker_data', JSON.stringify(appState.habitData));
}

function loadPoints() {
    const saved = localStorage.getItem('habitTracker_points');
    appState.points = saved ? parseInt(saved) : 0;
}

function savePoints() {
    localStorage.setItem('habitTracker_points', appState.points);
}

function getTodayData() {
    if (!appState.habitData[appState.today]) {
        appState.habitData[appState.today] = { habits: {}, timestamp: Date.now() };
    }
    return appState.habitData[appState.today];
}

// =============================================
// RENDERING
// =============================================

function renderYearCalendar() {
    elements.yearCalendar.innerHTML = '';
    elements.yearTitle.textContent = appState.selectedYear;
    elements.currentYear.textContent = appState.selectedYear;

    for (let month = 0; month < 12; month++) {
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';

        const header = document.createElement('div');
        header.className = 'month-header';
        header.textContent = new Date(appState.selectedYear, month).toLocaleDateString('en-US', { month: 'long' });

        const daysGrid = document.createElement('div');
        daysGrid.className = 'month-days';

        const firstDay = new Date(appState.selectedYear, month, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'day-cell empty';
            daysGrid.appendChild(empty);
        }

        const daysInMonth = new Date(appState.selectedYear, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            cell.textContent = day;

            const dateStr = `${appState.selectedYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (appState.habitData[dateStr]) {
                const data = appState.habitData[dateStr];
                const completed = Object.values(data.habits).filter(Boolean).length;
                const total = Object.keys(data.habits).length || appState.habits.length;
                const ratio = total > 0 ? completed / total : 0;
                const percent = Math.round(ratio * 100);
                cell.title = `${percent}% completed`;

                if (ratio === 1) cell.classList.add('completed');
                else if (ratio >= 0.5) cell.classList.add('partial');
                else if (ratio > 0) cell.classList.add('partial');
                else cell.classList.add('failed');
            } else if (dateStr < appState.today) {
                cell.classList.add('failed');
                cell.title = 'No data';
            } else if (dateStr > appState.today) {
                cell.classList.add('future');
            }

            if (dateStr === appState.today) cell.classList.add('today');

            daysGrid.appendChild(cell);
        }

        monthContainer.appendChild(header);
        monthContainer.appendChild(daysGrid);
        elements.yearCalendar.appendChild(monthContainer);
    }
}

function renderHabitsList() {
    elements.habitsList.innerHTML = '';
    const todayData = getTodayData();
    const savedToday = Object.keys(todayData.habits).length > 0;

    appState.habits.forEach(habit => {
        const item = document.createElement('div');
        item.className = `habit-item ${savedToday ? 'locked' : ''}`;
        

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'habit-checkbox';
        checkbox.checked = !!todayData.habits[habit];
        checkbox.disabled = savedToday;

        const label = document.createElement('label');
        label.className = 'habit-label';
        label.textContent = habit;

        item.appendChild(checkbox);
        item.appendChild(label);
        elements.habitsList.appendChild(item);
    });

    updateCompletionPercentage();
}

function updateCompletionPercentage() {
    const todayData = getTodayData();
    const completed = Object.values(todayData.habits).filter(Boolean).length;
    const total = appState.habits.length || 1;
    const percent = Math.round((completed / total) * 100);

    elements.completionPercent.textContent = `${percent}%`;
    elements.progressFill.style.width = `${percent}%`;

    let color = '#e74c3c';
    if (percent === 100) color = '#2ecc71';
    else if (percent > 0) color = '#f1c40f';

    elements.completionPercent.style.color = color;
    elements.progressFill.style.backgroundColor = color;
}

function updateStats() {
    let totalCompleted = 0;
    let currentStreak = 0;
    let bestStreak = 0;
    let streakCount = 0;
    let yearlySum = 0, yearlyDays = 0;
    let monthlySum = 0, monthlyDays = 0;

    const todayMonth = new Date(appState.today).getMonth();

    Object.keys(appState.habitData).sort().forEach(date => {
        const data = appState.habitData[date];
        const completed = Object.values(data.habits).filter(Boolean).length;
        const total = Object.keys(data.habits).length || appState.habits.length;
        const ratio = total > 0 ? completed / total : 0;

        if (ratio === 1) {
            totalCompleted++;
            streakCount++;
            currentStreak = streakCount;
            bestStreak = Math.max(bestStreak, streakCount);
        } else {
            streakCount = 0;
        }

        yearlySum += ratio * 100;
        yearlyDays++;

        if (new Date(date).getMonth() === todayMonth) {
            monthlySum += ratio * 100;
            monthlyDays++;
        }
    });

    elements.totalCompleted.textContent = totalCompleted;
    elements.currentStreak.textContent = currentStreak;
    elements.bestStreak.textContent = bestStreak;
    elements.totalPoints.textContent = appState.points;
    elements.monthlyAvg.textContent = monthlyDays ? Math.round(monthlySum / monthlyDays) + '%' : '0%';
    elements.yearlyAvg.textContent = yearlyDays ? Math.round(yearlySum / yearlyDays) + '%' : '0%';
    elements.streakCounter.textContent = `🔥 ${currentStreak} Day Streak`;
}

function renderCharts() {
    renderMonthlyChart();
    renderHabitChart();
}

function renderMonthlyChart() {
    const ctx = elements.monthlyChart.getContext('2d');
    const data = [];

    for (let m = 0; m < 12; m++) {
        let sum = 0, count = 0;
        const daysInMonth = new Date(appState.selectedYear, m + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const date = `${appState.selectedYear}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            if (appState.habitData[date]) {
                const habits = Object.values(appState.habitData[date].habits);
                const ratio = habits.length ? habits.filter(Boolean).length / habits.length : 0;
                sum += ratio * 100;
                count++;
            }
        }
        data.push(count ? Math.round(sum / count) : 0);
    }

    if (monthlyChartInstance) monthlyChartInstance.destroy();
    monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [{ data, backgroundColor: '#4b6cb7', borderColor: '#4b6cb7' }]
        },
        options: {
            scales: { y: { beginAtZero: true, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });
}


function renderHabitChart() {
    const ctx = elements.habitChart.getContext('2d');
    const rates = appState.habits.map(habit => {
        let completed = 0, total = 0;
        Object.values(appState.habitData).forEach(day => {
            if (day.habits.hasOwnProperty(habit)) {
                total++;
                if (day.habits[habit]) completed++;
            }
        });
        return total ? Math.round((completed / total) * 100) : 0;
    });

    if (habitChartInstance) habitChartInstance.destroy();
    habitChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: appState.habits,
            datasets: [{
                label: 'Completion %',
                data: rates,
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { beginAtZero: true, max: 100 } }
        }
    });
}

// =============================================
// MODAL & EVENTS
// =============================================

function renderEditHabitsModal() {
    elements.defaultHabitsList.innerHTML = '';
    elements.customHabitsList.innerHTML = '';

    DEFAULT_HABITS.forEach(h => {
        const item = document.createElement('div');
        item.className = 'edit-habit-item default';
        item.innerHTML = `<i class="fas fa-lock"></i><span class="edit-habit-label">${h}</span>`;
        elements.defaultHabitsList.appendChild(item);
    });

    const custom = appState.habits.filter(h => !DEFAULT_HABITS.includes(h));
    custom.forEach(h => {
        const item = document.createElement('div');
        item.className = 'edit-habit-item custom';
        item.innerHTML = `<span class="edit-habit-label">${h}</span>`;
        const btn = document.createElement('button');
        btn.className = 'remove-habit-btn';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.onclick = () => {
            if (confirm(`Remove "${h}"?`)) {
                appState.habits = appState.habits.filter(x => x !== h);
                renderEditHabitsModal();
            }
        };
        item.appendChild(btn);
        elements.customHabitsList.appendChild(item);
    });
}


function setupEventListeners() {
    elements.prevYearBtn.onclick = () => { appState.selectedYear--; renderYearCalendar(); renderCharts(); };
    elements.nextYearBtn.onclick = () => { appState.selectedYear++; renderYearCalendar(); renderCharts(); };

    elements.saveTodayBtn.onclick = () => {
        const todayData = getTodayData();
        const checkboxes = document.querySelectorAll('.habit-checkbox');
        let newCompletions = 0;

        checkboxes.forEach((cb, i) => {
            const habit = appState.habits[i];
            const wasDone = todayData.habits[habit];
            todayData.habits[habit] = cb.checked;
            if (cb.checked && !wasDone) newCompletions++;
        });

        appState.points += newCompletions * 10;
        savePoints();
        saveHabitData();
        renderHabitsList();
        renderYearCalendar();
        updateStats();
        renderCharts();
    };

    elements.editHabitsBtn.onclick = () => {
        renderEditHabitsModal();
        elements.editHabitsModal.classList.add('active');
    };

    elements.closeModalBtns.forEach(btn => btn.onclick = () => elements.editHabitsModal.classList.remove('active'));
    elements.editHabitsModal.onclick = e => { if (e.target === elements.editHabitsModal) elements.editHabitsModal.classList.remove('active'); };

    elements.addHabitBtn.onclick = () => {
        const text = elements.newHabitInput.value.trim();
        if (text && !appState.habits.includes(text)) {
            appState.habits.push(text);
            elements.newHabitInput.value = '';
            renderEditHabitsModal();
        }
    };

    elements.newHabitInput.onkeypress = e => { if (e.key === 'Enter') elements.addHabitBtn.click(); };

    elements.saveHabitsBtn.onclick = () => {
        saveHabits();
        renderHabitsList();
        elements.editHabitsModal.classList.remove('active');
    };

    elements.darkModeToggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    };

    elements.exportBtn.onclick = exportData;
    elements.importBtn.onclick = () => elements.importFile.click();
    elements.importFile.onchange = e => { if (e.target.files[0]) importData(e.target.files[0]); };
}

function exportData() {
    const data = { habits: appState.habits, habitData: appState.habitData, points: appState.points };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habit-tracker-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.habits && data.habitData) {
                appState.habits = data.habits;
                appState.habitData = data.habitData;
                appState.points = data.points || 0;
                saveHabits();
                saveHabitData();
                savePoints();
                initializeApp();
                alert('Data imported successfully!');
            }
        } catch (err) {
            alert('Invalid file');
        }
    };
    reader.readAsText(file);
}

// Start app
document.addEventListener('DOMContentLoaded', initializeApp);
// optimize structure block 1
// optimize structure block 2
// optimize structure block 3
// optimize structure block 4
// optimize structure block 5
// optimize structure block 6
// optimize structure block 7
// optimize structure block 8
// optimize structure block 9
// optimize structure block 10
// optimize structure block 11
// optimize structure block 12
// optimize structure block 13
// optimize structure block 14
// optimize structure block 15
// optimize structure block 16
// optimize structure block 17
// optimize structure block 18
// optimize structure block 19
// optimize structure block 20
// optimize structure block 21
// optimize structure block 22
// optimize structure block 23
// optimize structure block 24
// optimize structure block 25
