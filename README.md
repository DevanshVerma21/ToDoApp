# To-Do App

A modern, responsive To-Do application built with HTML, CSS, and JavaScript that fulfills all the specified user stories.

## Features

### ✅ User Story 1: Two-Pane Layout
- **Left Pane**: Displays a list of tasks with options to mark as completed or delete
- **Right Pane**: Contains a task form for adding new tasks

### ✅ User Story 2: Task Management
- Add new tasks with title, description, and priority levels
- Mark tasks as completed with visual feedback
- Tasks automatically save to browser's local storage

### ✅ User Story 3: Task Deletion
- Delete tasks using the cross (×) icon
- Confirmation dialog prevents accidental deletions
- Smooth animation effects for better user experience

## Additional Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Priority Levels**: High, Medium, and Low priority with color-coded indicators
- **Local Storage**: Tasks persist between browser sessions
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Enter`: Submit form
  - `Escape`: Clear form
- **Visual Feedback**: Hover effects, animations, and completed task styling
- **Empty State**: Helpful message when no tasks exist

## Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Modern styling with Flexbox, gradients, and animations
- **JavaScript (ES6+)**: Interactive functionality and local storage

## File Structure

```
ToDoApp/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## How to Run

1. **Local Development**:
   ```bash
   # Navigate to project directory
   cd "d:\javascript projects\ToDoApp"
   
   # Start local server (Python 3)
   python -m http.server 8000
   
   # Or use any other local server
   # npm install -g live-server && live-server
   ```

2. **Open in Browser**:
   - Visit `http://localhost:8000`
   - Or simply open `index.html` directly in any modern browser

## Usage

1. **Adding Tasks**:
   - Fill in the task title (required)
   - Add description (optional)
   - Select priority level
   - Click "Add Task" or press `Ctrl+Enter`

2. **Managing Tasks**:
   - Check the checkbox to mark tasks as completed
   - Click the × button to delete tasks
   - Completed tasks show with strikethrough text and muted colors

3. **Data Persistence**:
   - Tasks automatically save to your browser's local storage
   - Data persists between browser sessions
   - Clear browser data to reset all tasks

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Screenshots

The app features a beautiful gradient background with a clean two-pane interface:
- Left side shows your task list with checkboxes and delete buttons
- Right side contains the form for adding new tasks
- Responsive design adapts to different screen sizes

## Future Enhancements

- Task editing functionality
- Due dates and reminders
- Task categories/tags
- Search and filter options
- Export/import functionality
- Drag and drop reordering

---

**Author**: Created for JavaScript Development Assignment
**Date**: September 2025