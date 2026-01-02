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
