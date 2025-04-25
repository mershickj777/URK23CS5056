const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
let editingId = null;

function renderContacts() {
  contactList.innerHTML = '';
  fetch('http://localhost:5000/contacts')
    .then(res => res.json())
    .then(contacts => {
      contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${contact.name} | ${contact.phone} | ${contact.email}</span>
          <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.phone}', '${contact.email}')">Edit</button>
          <button onclick="deleteContact(${contact.id})">Delete</button>
        `;
        contactList.appendChild(li);
      });
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value;
  const phone = form.phone.value;
  const email = form.email.value;

  const contactData = { name, phone, email };

  if (editingId) {
    fetch(`http://localhost:5000/contacts/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    }).then(() => {
      editingId = null;
      form.reset();
      renderContacts();
    });
  } else {
    fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    }).then(() => {
      form.reset();
      renderContacts();
    });
  }
});

function deleteContact(id) {
  fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' })
    .then(() => renderContacts());
}

function editContact(id, name, phone, email) {
  form.name.value = name;
  form.phone.value = phone;
  form.email.value = email;
  editingId = id;
}

renderContacts();
