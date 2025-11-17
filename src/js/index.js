class Users {
    static url = 'http://localhost:3000/api/students';
    static async sendUser(user) {
        try {
            const headers = { method: "POST", body: JSON.stringify(user), "Content-Type": "application/json" }
            const ans = await fetch(this.url, headers);
            return ans.status;
        } catch(error) {
            console.log(error);
        }
    }
    static async deleteUser(id) {
        try {
            const headers = {method: "DELETE"};
            const ans = await fetch(`${this.url}/${id}`, headers);
            return ans.status;
        } catch(error) {
            console.log(error);
        }
    }

    constructor(users_list = []) {
        this.users_list = users_list;
    }

    async getUsers(param = '') {
        try {
            const ans = await fetch(Users.url + `?search=${param}`);
            const data = await ans.json();
            if (param == '') this.users_list = data;
            this.printUsers(data);
        } catch(error) {
            console.log(error);
        }
    }

    printUsers(users = this.users_list) {
        if (users.length == 0) return;
        function countYears(start, end, round = 'floor') {
            return Math[round]((end-start) / (365 * 24 * 60 * 60 * 1000))
        }
        function birthday(date) { 
            const year = new Date()
            const birthday_date = new Date(date);
            const age = countYears(birthday_date, year);
            return `${birthday_date.toLocaleDateString().replaceAll("/", '.')} (${age} лет)`
        }
        function studyStart(date) {
            const year = new Date(); 
            const start = new Date(date, 8, 1);
            const course = countYears(start, year, 'ceil') <= 4 ? countYears(start, year, 'ceil') + " курс" : "Закончил";
            return `${date}-${parseInt(date)+4} (${course})`;
        }
        document.querySelectorAll('.user').forEach(user => user.remove());
        const temp_user = document.getElementById("temp-user_row").content;
        const table_place = document.getElementById("table-body");
        const keys = {independent: ['id', 'faculty'], fio: ["surname", "name", "lastname"], custom: {birthday, studyStart}};
        users.forEach(user_data => {
            const user = temp_user.cloneNode(true);
            const fio = keys.fio.map(key => user_data[key]).join(" ");
            keys.independent.forEach(key => {
                user.querySelector(`.${key}`).textContent = user_data[key];
            });
            user.querySelector('.fio').textContent = fio;
            Object.keys(keys.custom).forEach(key => {
                user.querySelector('.' + key).textContent = keys.custom[key](user_data[key]);
            })
            user.querySelector('.actions').setAttribute('id', user_data.id);
            user.querySelector(".delete_user").addEventListener('click', eventDelete);
            table_place.appendChild(user);
        })
    }
    
    sort() {

    }
}
const users = new Users();


function setMaxDateForm() {
    const date = new Date();
    const birthday = document.querySelector('[name="birthday"]');
    const studyStart = document.querySelector('[name="studyStart"]');
    birthday.max = date.toLocaleDateString().replaceAll('/', '-');
    studyStart.max = date.getFullYear();
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
    Users.sendUser(user);
    users.getUsers();
}

function eventDelete(event) {
    const id = event.target.parentNode.getAttribute('id');
    Users.deleteUser(id);
    users.getUsers();
}

function eventSearch(event) {
    const inp = event.target.parentNode.firstChild
    const param = inp.value;
    inp.value = "";

    users.getUsers(param);
}


document.getElementById('form').addEventListener('submit', eventForm);
document.getElementById('find-user').addEventListener('click', eventSearch);
document.getElementById('find-user_reset').addEventListener('click', e => {users.printUsers();e.target.parentNode.firstChild.value = ""})
document.addEventListener('DOMContentLoaded', async e => {
    setMaxDateForm();
    users.getUsers();
    
})  