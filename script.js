const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${contact.name} | ${contact.phone} | ${contact.email}</span>
      <button class="edit" onclick="editContact(${index})">Edit</button>
      <button class="delete" onclick="deleteContact(${index})">Delete</button>
    `;
    contactList.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value;
  const phone = form.phone.value;
  const email = form.email.value;

  contacts.push({ name, phone, email });
  localStorage.setItem('contacts', JSON.stringify(contacts));
  form.reset();
  renderContacts();
});

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

function editContact(index) {
  const contact = contacts[index];
  form.name.value = contact.name;
  form.phone.value = contact.phone;
  form.email.value = contact.email;
  deleteContact(index);
}

renderContacts();
