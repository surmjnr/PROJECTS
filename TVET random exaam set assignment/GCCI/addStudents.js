// Initialize students array from localStorage or create empty array
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to update the display of current students
function updateStudentList() {
    const studentList = document.getElementById('currentStudents');
    const totalStudents = document.getElementById('totalStudents');
    studentList.innerHTML = '';
    
    if (totalStudents) {
        totalStudents.textContent = students.length;
    }
    
    students.sort().forEach((student, index) => {
        const row = document.createElement('tr');
        
        const numCell = document.createElement('td');
        numCell.textContent = index + 1;
        
        const nameCell = document.createElement('td');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = student;
        nameSpan.className = 'student-name';
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = student;
        editInput.className = 'edit-input hidden';
        
        nameCell.appendChild(nameSpan);
        nameCell.appendChild(editInput);
        
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'save-btn hidden';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'cancel-btn hidden';
        
        // Edit functionality
        editBtn.onclick = () => {
            nameSpan.classList.add('hidden');
            editInput.classList.remove('hidden');
            editBtn.classList.add('hidden');
            deleteBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
            cancelBtn.classList.remove('hidden');
            editInput.focus();
        };
        
        // Cancel functionality
        cancelBtn.onclick = () => {
            nameSpan.classList.remove('hidden');
            editInput.classList.add('hidden');
            editBtn.classList.remove('hidden');
            deleteBtn.classList.remove('hidden');
            saveBtn.classList.add('hidden');
            cancelBtn.classList.add('hidden');
            editInput.value = student;
        };
        
        // Save functionality
        saveBtn.onclick = () => {
            const newName = editInput.value.trim();
            if (newName && newName !== student && !students.includes(newName)) {
                const index = students.indexOf(student);
                students[index] = newName;
                saveStudents();
                updateStudentList();
            } else {
                cancelBtn.click();
            }
        };
        
        // Delete functionality
        deleteBtn.onclick = () => {
            // Remove student from students array
            students = students.filter(s => s !== student);
            
            // Get and update assignedStudents
            let assignedStudents = JSON.parse(localStorage.getItem('assignedStudents')) || [];
            assignedStudents = assignedStudents.filter(s => s.name !== student);
            
            // Save both updates to localStorage
            localStorage.setItem('assignedStudents', JSON.stringify(assignedStudents));
            saveStudents();
            updateStudentList();
        };
        
        actionCell.appendChild(editBtn);
        actionCell.appendChild(saveBtn);
        actionCell.appendChild(cancelBtn);
        actionCell.appendChild(deleteBtn);
        
        row.appendChild(numCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);
        
        studentList.appendChild(row);
    });
}

// Initialize the page
window.onload = function() {
    const studentInput = document.getElementById('studentName');
    const addButton = document.getElementById('addButton');
    const fileInput = document.getElementById('fileInput');
    const importButton = document.getElementById('importButton');

    addButton.addEventListener('click', function() {
        const name = studentInput.value.trim();
        if (name && !students.includes(name)) {
            students.push(name);
            saveStudents();
            updateStudentList();
            studentInput.value = '';
        }
    });

    studentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    importButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                // Split content by newlines and filter out empty lines
                const newStudents = content.split(/\r?\n/)
                    .map(name => name.trim())
                    .filter(name => name && !students.includes(name));
                
                if (newStudents.length > 0) {
                    if (confirm(`Add ${newStudents.length} new students?`)) {
                        students.push(...newStudents);
                        saveStudents();
                        updateStudentList();
                    }
                } else {
                    alert('No new students found in file or all students already exist.');
                }
            };
            reader.readAsText(file);
        }
        // Reset file input
        fileInput.value = '';
    });

    updateStudentList();
}; 