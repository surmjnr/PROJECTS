# Random Exam Set Assignment System

A web-based system for randomly assigning students to different exam sets while maintaining balanced distribution. This system is perfect for educational institutions looking to fairly distribute students across multiple exam versions.

## Features

- **Random Set Assignment**: Automatically assigns students to exam sets (1, 2, or 3) randomly
- **Balanced Distribution**: Ensures equal distribution of students across all sets
- **Student Management**:
  - Add individual students
  - Bulk import students via text file
  - Edit student names
  - Delete students
- **Assignment Management**:
  - View real-time distribution statistics
  - Clear all assignments
  - Track assigned and unassigned students
- **Persistent Storage**: All data is stored locally in the browser
- **Responsive Design**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/surmjnr/exam-set-assignment.git
```

2. Navigate to the project directory:
```bash
cd exam-set-assignment
```

3. Open `index.html` in your web browser or serve through a local web server

### Usage

1. **Adding Students**:
   - Navigate to "Add Students" page
   - Enter student names individually or
   - Import a text file containing student names (one name per line)

2. **Assigning Sets**:
   - Go to the main page
   - Select a student from the dropdown
   - Click "Assign Exam Set"
   - The system will randomly assign an available set

3. **Managing Assignments**:
   - View current distribution in the stats section
   - Use "Clear All Assignments" to reset assignments
   - View all assignments in the table below

### File Structure

```
GCCI/
├── index.html              # Main assignment page
├── addStudents.html       # Student management page
├── script.js              # Main functionality
├── addStudents.js        # Student management functionality
├── styles.css            # Base styles
├── enhanced-styles.css   # Additional styling
└── addStudents.css      # Student management page styles
```

## Technical Details

### Storage
- Uses browser's localStorage for data persistence
- Stores two main data structures:
  - `students`: Array of student names
  - `assignedStudents`: Array of objects containing student names and assigned sets

### Distribution Algorithm
- Calculates target count per set based on total students
- Randomly assigns students to available sets
- Maintains balanced distribution across all sets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Built for educational institutions requiring fair exam set distribution
- Designed with simplicity and efficiency in mind
- Mobile-responsive interface for ease of use on any device

## Support

For support, please open an issue in the GitHub repository or contact [abbertehbanafo@gmail.com]



