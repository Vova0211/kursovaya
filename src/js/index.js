const url = 'http://localhost:3000/api/students';
var users_list = [];


async function getUsers() {
    try {
        const ans = await fetch(url);
        const data = await ans.json();
        return data;
        // users_list = data;
        // localStorage.setItem('users', JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
}

async function sendUser(user) {
    try {
        const headers = { method: "POST", body: JSON.stringify(user), "Content-Type": "application/json" }
        const ans = fetch(url, headers);
    } catch(error) {
        console.log(error);
    }
}

async function deleteUser(id) {
    try {
        const headers = {method: "DELETE"};
        const ans = fetch(`${url}/${id}`, headers);
    } catch(error) {
        console.log(error);
    }
}

function setMaxDateForm() {
    const date = new Date();
    const birthday = document.querySelector('[name="birthday"]');
    const studyStart = document.querySelector('[name="studyStart"]');
    birthday.max = date.toLocaleDateString().replaceAll('/', '-');
    studyStart.max = date.getFullYear();
}

function showUsers(users) {
    if (users.length == 0) return;
    const temp_user = document.getElementById("temp-user_row").content;
    const table_place = document.getElementById("table-body");
    const keys = ['id','name','surname','lastname','birthday','studyStart','faculty'];
    
    users.forEach(user_data => {
        const user = temp_user.cloneNode(true);
        keys.forEach(key => {
            user.querySelector(`.${key}`).textContent = user_data[key];
        });
        user.querySelector('.actions').setAttribute('id', user_data.id);
        user.querySelector(".delete_user").addEventListener('click', eventDelete);
        table_place.appendChild(user);
    })
}

function eventForm(event) {
    event.preventDefault();
    const form_html = event.target;
    const user = {};
    const user_keys = ["name", "surname", "lastname", "birthday", "studyStart", "faculty"];
    user_keys.forEach(key => {
        const value = form_html.querySelector(`[name="${key}"]`).value;
        if (key == 'birthday') {
            user[key] = new Date(value).toISOString();
        } else {
            user[key] = value;
        }
    });
    sendUser(user);
    getUsers();
}

function eventDelete(event) {
    const id = event.target.parentNode.getAttribute('id');
    deleteUser(id);
    
}



document.getElementById('form').addEventListener('submit', eventForm);
document.addEventListener('DOMContentLoaded', async e => {
    setMaxDateForm();
    users_list = await getUsers();
    showUsers(users_list)
})  