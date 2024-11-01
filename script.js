// Initialize arrays and counts
let students = JSON.parse(localStorage.getItem('students')) || [];
let assignedStudents = JSON.parse(localStorage.getItem('assignedStudents')) || [];
let setCounts = [0, 0, 0]; // Index 0,1,2 corresponds to Set 1,2,3

function updateTotalStudents() {
    const totalStudentsSpan = document.getElementById('totalStudents');
    if (totalStudentsSpan) {
        totalStudentsSpan.textContent = students.length;
    }
}

function updateSetCounts() {
    // Reset counts
    setCounts = [0, 0, 0];
    
    // Count students in each set
    assignedStudents.forEach(student => {
        setCounts[student.examSet - 1]++;
    });
    
    // Update display
    for (let i = 1; i <= 3; i++) {
        const countElement = document.getElementById(`set${i}Count`);
        if (countElement) {
            const targetCount = Math.ceil(students.length / 3);
            countElement.textContent = `${setCounts[i-1]}/${targetCount}`;
        }
    }
}

function assignExamSet() {
    const totalStudents = students.length;
    const targetPerSet = Math.ceil(totalStudents / 3);
    
    // Get available sets (sets that haven't reached their target)
    const availableSets = [];
    setCounts.forEach((count, index) => {
        if (count < targetPerSet) {
            availableSets.push(index + 1);
        }
    });
    
    // If no sets are available, return null
    if (availableSets.length === 0) {
        return null;
    }
    
    // Randomly select one of the available sets
    const randomIndex = Math.floor(Math.random() * availableSets.length);
    return availableSets[randomIndex];
}

function updateTable() {
    const studentList = document.getElementById("studentList");
    const studentSelect = document.getElementById("studentSelect");
    studentList.innerHTML = '';
    
    // Update total students count and set counts
    updateTotalStudents();
    updateSetCounts();
    
    // Clear and repopulate dropdown
    studentSelect.innerHTML = '<option value="">Select your name</option>';
    students.sort().forEach(student => {
        const option = document.createElement("option");
        option.value = student;
        option.textContent = student;
        
        if (assignedStudents.some(s => s.name === student)) {
            option.disabled = true;
        }
        
        studentSelect.appendChild(option);
    });

    // Update table with assigned students
    assignedStudents.forEach(student => {
        const row = document.createElement("tr");
        
        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        
        const examSetCell = document.createElement("td");
        examSetCell.textContent = student.examSet;
        
        row.appendChild(nameCell);
        row.appendChild(examSetCell);
        studentList.appendChild(row);
    });
}

// Initialize the page
window.onload = function() {
    const studentSelect = document.getElementById("studentSelect");
    const assignButton = document.getElementById("assignButton");
    const assignedNumber = document.getElementById("assignedNumber");
    const clearButton = document.getElementById("clearButton");

    // Add clear button functionality
    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all assignments?')) {
            assignedStudents = [];
            localStorage.setItem('assignedStudents', JSON.stringify(assignedStudents));
            assignedNumber.textContent = '';
            updateTable();
        }
    });

    // Enable/disable assign button based on selection
    studentSelect.addEventListener('change', function() {
        assignButton.disabled = !this.value || assignedStudents.some(s => s.name === this.value);
        assignedNumber.textContent = '';
        
        if (assignedStudents.some(s => s.name === this.value)) {
            const student = assignedStudents.find(s => s.name === this.value);
            assignedNumber.textContent = `Already assigned to Set ${student.examSet}`;
        }
    });

    // Handle assign button click
    assignButton.addEventListener('click', function() {
        const selectedStudent = studentSelect.value;
        if (!selectedStudent) return;

        const examSet = assignExamSet();
        if (examSet === null) {
            assignedNumber.textContent = "All sets are full!";
            return;
        }

        // Add to assigned students list
        assignedStudents.push({
            name: selectedStudent,
            examSet: examSet
        });

        // Save to localStorage
        localStorage.setItem('assignedStudents', JSON.stringify(assignedStudents));

        // Update UI
        assignedNumber.textContent = `Set ${examSet}`;
        updateTable();
        
        // Reset selection
        studentSelect.value = "";
        assignButton.disabled = true;
    });

    updateTable();
};