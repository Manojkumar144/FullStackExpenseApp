    async function submitForm() {
      const amount = document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const category = document.getElementById('category').value;

      const response = await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, description, category }),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById('amount').value='';
        document.getElementById('description').value='';
        showUserList(result);
      } else {
        alert('Failed to submit the form. Please try again.');
      }
    }

    function showUserList(expense) {
  const userListDiv = document.getElementById('userList');
  userListDiv.innerHTML = '';

  const ul = document.createElement('ul');

  expense.forEach((expense) => {
    const li = document.createElement('li');
    li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginRight = '2px';
    editButton.style.marginLeft = '2px';
    editButton.style.marginTop = '2px';
    editButton.addEventListener('click', () => editUser(expense.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '2px';
    deleteButton.style.marginTop = '2px';
    deleteButton.addEventListener('click', () => deleteUser(expense.id));

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    ul.appendChild(li);
  });

  userListDiv.appendChild(ul);
}


    async function fetchUsers() {
      const response = await fetch('/api/expense');
      const expenses = await response.json();
      showUserList(expenses);
    }

    async function editUser(expenseId) {
  const newAmount = prompt('Enter the new amount:');
  const newDescription = prompt('Enter the new description:');
  const newCategory = prompt('choose the new category:');

  const response = await fetch(`/api/expense/${expenseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: newAmount, description: newDescription, category: newCategory }),
  });

  if (response.ok) {
    // Reload the user list after editing
    fetchUsers();
    console.log('User updated successfully');
  } else {
    console.error('Failed to update expense record');
  }
}

async function deleteUser(expenseId) {
  const confirmDelete = confirm('Are you sure you want to delete this record?');

  if (confirmDelete) {
    const response = await fetch(`/api/expense/${expenseId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the user list after deletion
      fetchUsers();
      console.log('expense record deleted successfully');
    } else {
      console.error('Failed to delete expense record');
    }
  }
}

// Fetch initial user list on page load
    fetchUsers();