// Job data - meaningful job listings
const jobsData = [
    {
        id: 1,
        companyName: 'Tech Innovators Inc',
        position: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$150,000 - $180,000',
        description: 'Build scalable web applications using React and modern JavaScript. Work with a talented team to create exceptional user experiences.',
        status: 'available'
    },
    {
        id: 2,
        companyName: 'Digital Solutions Ltd',
        position: 'UI/UX Designer',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        description: 'Design intuitive interfaces and conduct user research. Lead design initiatives from conception to implementation.',
        status: 'available'
    },
    {
        id: 3,
        companyName: 'CloudTech Systems',
        position: 'Backend Engineer',
        location: 'Seattle, WA',
        type: 'Full-time',
        salary: '$140,000 - $170,000',
        description: 'Develop robust backend services using Node.js and PostgreSQL. Optimize database performance and ensure system reliability.',
        status: 'available'
    },
    {
        id: 4,
        companyName: 'StartUp Hub',
        position: 'Full Stack Developer',
        location: 'Remote',
        type: 'Contract',
        salary: '$100,000 - $130,000',
        description: 'Build end-to-end features for our web platform. Collaborate with product and design teams in a fast-paced environment.',
        status: 'available'
    },
    {
        id: 5,
        companyName: 'Enterprise Solutions',
        position: 'DevOps Engineer',
        location: 'Austin, TX',
        type: 'Full-time',
        salary: '$130,000 - $160,000',
        description: 'Manage cloud infrastructure and implement CI/CD pipelines. Ensure high availability and security of production systems.',
        status: 'available'
    },
    {
        id: 6,
        companyName: 'Mobile First Corp',
        position: 'Mobile App Developer',
        location: 'Los Angeles, CA',
        type: 'Full-time',
        salary: '$125,000 - $155,000',
        description: 'Create native mobile applications for iOS and Android. Focus on performance optimization and user engagement.',
        status: 'available'
    },
    {
        id: 7,
        companyName: 'Data Analytics Pro',
        position: 'Data Scientist',
        location: 'Boston, MA',
        type: 'Full-time',
        salary: '$135,000 - $165,000',
        description: 'Analyze complex datasets and build machine learning models. Provide insights that drive business decisions.',
        status: 'available'
    },
    {
        id: 8,
        companyName: 'Quality Assurance Plus',
        position: 'QA Automation Engineer',
        location: 'Chicago, IL',
        type: 'Full-time',
        salary: '$110,000 - $140,000',
        description: 'Design and implement automated testing frameworks. Ensure product quality through comprehensive test coverage.',
        status: 'available'
    }
];

// State management
let allJobs = JSON.parse(JSON.stringify(jobsData));
let interviewJobs = [];
let rejectedJobs = [];

// DOM Elements
const allTab = document.getElementById('allTab');
const interviewTab = document.getElementById('interviewTab');
const rejectedTab = document.getElementById('rejectedTab');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const totalJobsDisplay = document.getElementById('totalJobs');
const interviewCountDisplay = document.getElementById('interviewCount');
const rejectedCountDisplay = document.getElementById('rejectedCount');
const jobsCountDisplay = document.getElementById('jobsCount');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderAllJobs();
    setupTabListeners();
    updateDashboard();
});

// Setup tab click listeners
function setupTabListeners() {
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });
}

// Switch between tabs
function switchTab(tabName) {
    // Update active tab button
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update active tab content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');

    // Render appropriate jobs
    if (tabName === 'all') {
        renderAllJobs();
    } else if (tabName === 'interview') {
        renderInterviewJobs();
    } else if (tabName === 'rejected') {
        renderRejectedJobs();
    }
}

// Render all available jobs
function renderAllJobs() {
    allTab.innerHTML = '';
    if (allJobs.length === 0) {
        allTab.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💼</div>
                <h3>No Jobs Available</h3>
                <p>All jobs have been categorized</p>
            </div>
        `;
        return;
    }

    allJobs.forEach(job => {
        const jobCard = createJobCard(job, 'all');
        allTab.appendChild(jobCard);
    });
}

// Render interview jobs
function renderInterviewJobs() {
    interviewTab.innerHTML = '';
    if (interviewJobs.length === 0) {
        interviewTab.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No Jobs Available</h3>
                <p>Start marking jobs for interview to see them here</p>
            </div>
        `;
        return;
    }

    interviewJobs.forEach(job => {
        const jobCard = createJobCard(job, 'interview');
        interviewTab.appendChild(jobCard);
    });
}

// Render rejected jobs
function renderRejectedJobs() {
    rejectedTab.innerHTML = '';
    if (rejectedJobs.length === 0) {
        rejectedTab.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❌</div>
                <h3>No Jobs Available</h3>
                <p>Rejected jobs will appear here</p>
            </div>
        `;
        return;
    }

    rejectedJobs.forEach(job => {
        const jobCard = createJobCard(job, 'rejected');
        rejectedTab.appendChild(jobCard);
    });
}

// Create a job card element
function createJobCard(job, section) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.dataset.jobId = job.id;
    jobCard.dataset.section = section;

    let statusBadge = '';
    let interviewBtnClass = '';
    let rejectedBtnClass = '';

    if (section === 'interview') {
        statusBadge = '<div class="job-card-status interview">Interview</div>';
        interviewBtnClass = 'active';
    } else if (section === 'rejected') {
        statusBadge = '<div class="job-card-status rejected">Rejected</div>';
        rejectedBtnClass = 'active';
    } else {
        statusBadge = '<div class="job-card-status available">Available</div>';
    }

    jobCard.innerHTML = `
        ${statusBadge}
        <div class="job-card-header">
            <div class="company-name">${job.companyName}</div>
            <div class="position">${job.position}</div>
        </div>
        <div class="job-card-meta">
            <div class="meta-item">📍 ${job.location}</div>
            <div class="meta-item">⏰ ${job.type}</div>
        </div>
        <div class="description">${job.description}</div>
        <div class="salary">${job.salary}</div>
        <div class="job-card-actions">
            <button class="btn btn-interview ${interviewBtnClass}" data-action="interview">Interview</button>
            <button class="btn btn-rejected ${rejectedBtnClass}" data-action="rejected">Rejected</button>
            <button class="btn btn-delete" data-action="delete">🗑️</button>
        </div>
    `;

    // Add event listeners
    const interviewBtn = jobCard.querySelector('[data-action="interview"]');
    const rejectedBtn = jobCard.querySelector('[data-action="rejected"]');
    const deleteBtn = jobCard.querySelector('[data-action="delete"]');

    interviewBtn.addEventListener('click', () => handleInterviewClick(job.id, jobCard));
    rejectedBtn.addEventListener('click', () => handleRejectedClick(job.id, jobCard));
    deleteBtn.addEventListener('click', () => handleDeleteClick(job.id, jobCard));

    return jobCard;
}

// Handle interview button click
function handleInterviewClick(jobId, cardElement) {
    const job = findJob(jobId);
    if (!job) return;

    // Remove from all other sections
    allJobs = allJobs.filter(j => j.id !== jobId);
    rejectedJobs = rejectedJobs.filter(j => j.id !== jobId);

    // Add to interview section if not already there
    if (!interviewJobs.find(j => j.id === jobId)) {
        interviewJobs.push(job);
    } else {
        // If already in interview, remove it
        interviewJobs = interviewJobs.filter(j => j.id !== jobId);
        allJobs.push(job);
    }

    updateDashboard();
    refreshCurrentTab();
}

// Handle rejected button click
function handleRejectedClick(jobId, cardElement) {
    const job = findJob(jobId);
    if (!job) return;

    // Remove from all other sections
    allJobs = allJobs.filter(j => j.id !== jobId);
    interviewJobs = interviewJobs.filter(j => j.id !== jobId);

    // Add to rejected section if not already there
    if (!rejectedJobs.find(j => j.id === jobId)) {
        rejectedJobs.push(job);
    } else {
        // If already in rejected, remove it
        rejectedJobs = rejectedJobs.filter(j => j.id !== jobId);
        allJobs.push(job);
    }

    updateDashboard();
    refreshCurrentTab();
}

// Handle delete button click
function handleDeleteClick(jobId, cardElement) {
    // Remove from all sections
    allJobs = allJobs.filter(j => j.id !== jobId);
    interviewJobs = interviewJobs.filter(j => j.id !== jobId);
    rejectedJobs = rejectedJobs.filter(j => j.id !== jobId);

    updateDashboard();
    refreshCurrentTab();
}

// Find job in any section
function findJob(jobId) {
    return allJobs.find(j => j.id === jobId) ||
           interviewJobs.find(j => j.id === jobId) ||
           rejectedJobs.find(j => j.id === jobId);
}

// Refresh current active tab
function refreshCurrentTab() {
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    switchTab(activeTab);
}

// Update dashboard counts
function updateDashboard() {
    const totalAvailable = allJobs.length;
    const totalInterview = interviewJobs.length;
    const totalRejected = rejectedJobs.length;

    totalJobsDisplay.textContent = totalAvailable;
    interviewCountDisplay.textContent = totalInterview;
    rejectedCountDisplay.textContent = totalRejected;
    jobsCountDisplay.textContent = totalAvailable;
}
