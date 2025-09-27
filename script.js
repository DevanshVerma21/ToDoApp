// Global variables
let tasks = [];
let taskIdCounter = 1;

// DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskPrioritySelect = document.getElementById('task-priority');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load tasks from localStorage if available
    loadTasksFromStorage();
    
    // Render initial tasks
    renderTasks();
    
    // Add event listener for form submission
    taskForm.addEventListener('submit', handleFormSubmit);
});

// Handle form submission (User Story 2)
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const priority = taskPrioritySelect.value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: taskIdCounter++,
        title: title,
        description: description,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add task to the beginning of the array
    tasks.unshift(newTask);
    
    // Save to localStorage
    saveTasksToStorage();
    
    // Re-render tasks
    renderTasks();
    
    // Reset form
    taskForm.reset();
    
    // Focus back to title input
    taskTitleInput.focus();
}

// Render all tasks in the left pane
function renderTasks() {
    // Clear existing tasks
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        renderEmptyState();
        return;
    }
    
    // Create and append task elements
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Create empty state message
function renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <h3>No tasks yet</h3>
        <p>Add your first task using the form on the right!</p>
    `;
    taskList.appendChild(emptyState);
}

// Create individual task element
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.priority}-priority ${task.completed ? 'completed' : ''}`;
    taskDiv.dataset.taskId = task.id;
    
    taskDiv.innerHTML = `
        <div class="task-header">
            <div style="display: flex; align-items: center; flex: 1;">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
            </div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    ×
                </button>
            </div>
        </div>
        ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
        <span class="task-priority-badge priority-${task.priority}">${task.priority}</span>
    `;
    
    return taskDiv;
}

// Toggle task completion (User Story 2 - Mark as completed)
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        
        // Add a subtle animation effect
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.style.transform = 'scale(0.98)';
            setTimeout(() => {
                taskElement.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// Delete task (User Story 3)
function deleteTask(taskId) {
    // Add confirmation dialog
    const task = tasks.find(t => t.id === taskId);
    if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
        // Remove task from array
        tasks = tasks.filter(t => t.id !== taskId);
        
        // Save to localStorage
        saveTasksToStorage();
        
        // Add delete animation
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.style.transform = 'translateX(-100%)';
            taskElement.style.opacity = '0';
            
            setTimeout(() => {
                renderTasks();
            }, 300);
        } else {
            renderTasks();
        }
    }
}

// Utility function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Save tasks to localStorage
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoAppTasks', JSON.stringify(tasks));
        localStorage.setItem('todoAppTaskCounter', taskIdCounter.toString());
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    try {
        const savedTasks = localStorage.getItem('todoAppTasks');
        const savedCounter = localStorage.getItem('todoAppTaskCounter');
        
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
        
        if (savedCounter) {
            taskIdCounter = parseInt(savedCounter, 10);
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
        taskIdCounter = 1;
    }
}

// Additional utility functions for enhanced user experience

// Clear all completed tasks
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasksToStorage();
        renderTasks();
    }
}

// Get task statistics
function getTaskStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    
    return {
        total,
        completed,
        pending,
        highPriority
    };
}

// Export tasks as JSON (for backup)
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === taskTitleInput || 
            document.activeElement === taskDescriptionInput) {
            handleFormSubmit(e);
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        if (document.activeElement === taskTitleInput || 
            document.activeElement === taskDescriptionInput) {
            taskForm.reset();
            taskTitleInput.focus();
        }
    }
});

// Auto-focus on title input when page loads
window.addEventListener('load', function() {
    taskTitleInput.focus();
});