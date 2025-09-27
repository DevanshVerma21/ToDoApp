# To-Do App (Storage Edition)

A modern, responsive To-Do application built with HTML, CSS, and JavaScript that integrates with local storage and provides comprehensive task management features.

## Features

### ✅ User Story 1: Two-Pane Layout with Local Storage
- **Left Pane**: Displays a list of tasks fetched from local storage
- **Right Pane**: Contains a textarea for adding new tasks

### ✅ User Story 2: ENTER Key Task Addition
- Press ENTER in the textarea to add tasks to local storage and the left pane
- Tasks immediately appear with completion and deletion options
- Textarea clears automatically after adding a task

### ✅ User Story 3: Task Completion
- Click checkbox to mark tasks as completed
- Task status updates in local storage automatically
- Visual feedback with strikethrough text and muted colors

### ✅ User Story 4: Task Deletion
- Delete tasks using the cross (×) icon
- Tasks are removed from both the interface and local storage
- Confirmation dialog prevents accidental deletions

### ✅ User Story 5: Task Editing
- Edit task names using the pencil (✏️) icon
- Inline editing with Enter to save or Escape to cancel
- Changes are automatically saved to local storage

## Additional Features

- **Persistent Storage**: All tasks are automatically saved to local storage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**:
  - `Enter`: Add new task (in textarea)
  - `Enter`: Save task edit (during editing)
  - `Escape`: Cancel task edit or clear textarea
- **Visual Feedback**: Hover effects, animations, and completed task styling
- **Empty State**: Helpful message when no tasks exist
- **Inline Editing**: Click-to-edit functionality for task names

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
   - Type your task in the textarea on the right pane
   - Press `Enter` to add the task (Shift+Enter for new line in textarea)
   - Task appears immediately in the left pane

2. **Managing Tasks**:
   - Check the checkbox to mark tasks as completed
   - Click the pencil (✏️) icon to edit task names
   - Click the × button to delete tasks
   - All changes automatically save to local storage

3. **Editing Tasks**:
   - Click the pencil icon to enter edit mode
   - Type your changes and press `Enter` to save
   - Press `Escape` to cancel editing

4. **Data Persistence**:
   - All tasks automatically save to local storage
   - Data persists between browser sessions
   - Tasks load automatically when you return to the app

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