import { API_URL, getAPI } from './common.js';
getmembers();

async function getmembers() {
  try {
    const token = localStorage.getItem('token');
    const data = await getAPI(`${API_URL}/users/token/${token}`, {
      method: 'GET',
    });

    membersList(data.users);
  } catch (e) {
    alert(e);
  }
}

function membersList(users) {
  const userList = document.querySelector('#userList');
  userList.innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    const item = document.createElement('tr');
    const { email, name, phoneNumber, birthdate } = users[i];
    item.innerHTML = `<tr class="user-list">
      <td>${birthdate}</td>
      <td>${email}</td>
      <td>${name}</td>
      <td>${phoneNumber}</td>
    </tr>`;
    userList.appendChild(item);
  }
}
