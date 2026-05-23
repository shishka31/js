document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('clientForm');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const searchInput = document.getElementById('searchInput');
  const tbody = document.getElementById('clientsTable');
  
  let editId = null;
  let clients = JSON.parse(localStorage.getItem('crm_clients')) || [];
  
  function saveToLocalStorage() {
    localStorage.setItem('crm_clients', JSON.stringify(clients));
  }
  
  function getStatusText(status) {
    const statusMap = {
      'new': 'Новый',
      'inWork': 'В работе',
      'closed': 'Завершён'
    };
    return statusMap[status] || status;
  }
  
  function renderTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredClients = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm) || 
      client.course.toLowerCase().includes(searchTerm)
    );
    
    tbody.innerHTML = '';
    
    if (filteredClients.length === 0) {
      const row = tbody.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = 6;
      cell.textContent = 'Нет данных';
      cell.style.textAlign = 'center';
      cell.style.padding = '20px';
      return;
    }
    
    filteredClients.forEach(client => {
      const row = tbody.insertRow();
      
      row.insertCell(0).textContent = client.id;
      row.insertCell(1).textContent = client.name;
      row.insertCell(2).textContent = client.course;
      row.insertCell(3).textContent = client.budget + ' денег';
      
      const statusCell = row.insertCell(4);
      statusCell.textContent = getStatusText(client.status);
      statusCell.style.fontWeight = 'bold';
      
      const actionsCell = row.insertCell(5);
      
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Редактировать';
      editBtn.style.marginRight = '5px';
      editBtn.style.padding = '5px 10px';
      editBtn.style.backgroundColor = '#fffb00';
      editBtn.onclick = () => editClient(client.id);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Удалить';
      deleteBtn.style.padding = '5px 10px';
      deleteBtn.style.backgroundColor = '#ff4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.onclick = () => deleteClient(client.id);
      
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    });
  }
  
  function addClient(name, course, budget, status) {
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    
    clients.push({
      id: newId,
      name: name,
      course: course,
      budget: Number(budget),
      status: status
    });
    
    saveToLocalStorage();
    renderTable();
  }
  
  function updateClient(id, name, course, budget, status) {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = {
        id: id,
        name: name,
        course: course,
        budget: Number(budget),
        status: status
      };
      saveToLocalStorage();
      renderTable();
    }
  }
  
  function editClient(id) {
    const client = clients.find(c => c.id === id);
    if (client) {
      document.getElementById('editId').value = client.id;
      document.getElementById('name').value = client.name;
      document.getElementById('course').value = client.course;
      document.getElementById('budget').value = client.budget;
      document.getElementById('status').value = client.status;
      
      submitBtn.textContent = 'Сохранить';
      cancelBtn.style.display = 'inline-block';
      editId = client.id;
      
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function deleteClient(id) {
    if (confirm('Удалить клиента?')) {
      clients = clients.filter(c => c.id !== id);
      saveToLocalStorage();
      renderTable();
      
      if (editId === id) {
        resetForm();
      }
    }
  }
  
  function resetForm() {
    document.getElementById('editId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('course').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('status').value = 'new';
    
    submitBtn.textContent = 'Добавить';
    cancelBtn.style.display = 'none';
    editId = null;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const course = document.getElementById('course').value.trim();
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;
    
    if (!name || !course || !budget) {
      alert('Поля заполни да');
      return;
    }
    
    if (editId !== null) {
      updateClient(editId, name, course, budget, status);
      resetForm();
    } else {
      addClient(name, course, budget, status);
      resetForm();
    }
  });
  
  cancelBtn.addEventListener('click', resetForm);
  searchInput.addEventListener('input', renderTable);
  
  renderTable();
});