async function checkAuth() {
    const user = document.getElementById('userIn').value;
    const pass = document.getElementById('passIn').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pass })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('loginOverlay').style.display = 'none';
            document.getElementById('mainApp').classList.remove('app-hidden');
            loadEmployees();
        } else {
            alert("Invalid Login!");
        }
    } catch (err) {
        alert("Server error!");
    }
}

async function loadEmployees() {
    const res = await fetch('/api/employees');
    const data = await res.json();
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = data.map(emp => `
        <tr>
            <td>${emp.empId}</td>
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>${emp.dept}</td>
        </tr>
    `).join('');
}

// Form logic
document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEmp = {
        name: document.getElementById('empName').value,
        role: document.getElementById('role').value,
        dept: document.getElementById('dept').value
    };
    await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmp)
    });
    loadEmployees();
});
