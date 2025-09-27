// Global variables
let tasks = [];
let taskIdCounter = 1;

// DOM elements
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load tasks from localStorage (User Story 1)
    loadTasksFromStorage();
    
    // Render initial tasks
    renderTasks();
    
    // Add event listener for ENTER key in textarea (User Story 2)
    taskInput.addEventListener('keydown', handleTextareaEnter);
    
    // Focus on textarea
    taskInput.focus();
});

// Handle ENTER key press in textarea (User Story 2)
function handleTextareaEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        
        const taskText = taskInput.value.trim();
        
        if (!taskText) {
            alert('Please enter a task');
            return;
        }
        
        // Create new task object
        const newTask = {
            id: taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Add task to the beginning of the array
        tasks.unshift(newTask);
        
        // Save to localStorage
        saveTasksToStorage();
        
        // Re-render tasks
        renderTasks();
        
        // Clear textarea
        taskInput.value = '';
        
        // Keep focus on textarea
        taskInput.focus();
    }
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
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.dataset.taskId = task.id;
    
    taskDiv.innerHTML = `
        <div class="task-header">
            <div style="display: flex; align-items: center; flex: 1;">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})">
                <h3 class="task-title" id="task-title-${task.id}">${escapeHtml(task.text)}</h3>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})" title="Edit task">
                    ✏️
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    ×
                </button>
            </div>
        </div>
    `;
    
    return taskDiv;
}

// Toggle task completion (User Story 3)
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        // Save updated status to localStorage
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

// Delete task (User Story 4)
function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task && confirm(`Are you sure you want to delete "${task.text}"?`)) {
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

// Edit task (User Story 5)
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const titleElement = document.getElementById(`task-title-${taskId}`);
    const currentText = task.text;
    
    // Create input element for editing
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'task-title editing';
    
    // Replace title with input
    titleElement.style.display = 'none';
    titleElement.parentNode.insertBefore(input, titleElement.nextSibling);
    
    // Focus and select all text
    input.focus();
    input.select();
    
    // Handle save on Enter or blur
    function saveEdit() {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
            task.text = newText;
            saveTasksToStorage();
            renderTasks();
        } else {
            // Restore original title
            titleElement.style.display = 'block';
            input.remove();
        }
    }
    
    // Handle cancel on Escape
    function cancelEdit() {
        titleElement.style.display = 'block';
        input.remove();
    }
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    });
    
    input.addEventListener('blur', saveEdit);
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
    
    return {
        total,
        completed,
        pending
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
    // Escape to clear textarea
    if (e.key === 'Escape') {
        if (document.activeElement === taskInput) {
            taskInput.value = '';
        }
    }
});

// Auto-focus on textarea when page loads
window.addEventListener('load', function() {
    taskInput.focus();
});