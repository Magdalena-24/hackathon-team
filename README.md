# Task Manager + Pomodoro Timer (Web App)
### Overview
This is a simple productivity web application that combines a Task Manager and a Pomodoro Timer.
Users can create tasks, assign categories and priority levels, set due dates, and manage their progress using filters and sorting.
The Pomodoro Timer helps users stay focused by working in timed sessions.

## Features
### ✅ Task Management 
- Add new tasks with:
    - Task name
    - Category (e.g. School, Work, Personal)
    - Priority (High, Medium, Low)
    - Due date
- Mark tasks as completed
- Delete tasks
- Start a task (connects to Pomodoro section)

### 🔍 Filtering & Sorting
- Filter tasks by:
    - All
    - Active
    - Completed
- Filter tasks by category using a dropdown
- Sort tasks by priority using a dropdown:
    - High → Medium → Low

### ⏳ Pomodoro Timer
- Displays the task currently being worked on
- Countdown timer for focus sessions
- Helps users manage time and stay productive

### Technologies Used
- HTML – structure
- CSS + Bootstrap – layout and styling
- JavaScript – task logic, filtering, sorting, and timer functionality
- Font Awesome – icons

### How It Works
- Tasks are stored in a JavaScript array
- JavaScript functions handle:
  - adding tasks
  - displaying tasks
  - filtering tasks
  - sorting tasks
  - updating task status
-Event listeners are used so buttons and dropdowns respond when clicked

### How to Run the Project
- Download or clone the repository
- Open the project folder
- Open index.html in your browser
  
### Team Workflow
- We used Git and GitHub branches for collaboration
- Each feature was developed in a separate branch
- Changes were merged into the master branch after testing

### Challenges Faced
- Managing Git branches and merging changes
- Making sure filtering and sorting worked correctly together
- Keeping the UI clean and responsive across different screen sizes

### Lessons Learned
- Version control and teamwork are very important in group projects
- Proper planning makes building features easier
- It’s better to focus on building a simple and working solution than trying to add too many features

### Possible Improvements
- Save tasks using LocalStorage or a database
- Add edit task functionality
- Add custom Pomodoro session lengths
- Add user accounts/login

[Live Demo Here](https://blossomplanner.netlify.app/)
