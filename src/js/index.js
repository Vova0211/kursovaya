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
document.querySelectorAll('.t-head').forEach(th => {th.addEventListener('click', e => {
    const key = th.dataset.name;
    console.log(key);
    
    users.sort(key);
})})
document.getElementById('form').addEventListener('submit', eventForm);
document.getElementById('find-user').addEventListener('click', eventSearch);
document.getElementById('find-user_reset').addEventListener('click', e => {
    users.printUsers();e.target.parentNode.firstChild.value = "";
})
document.addEventListener('DOMContentLoaded', async e => {
    setMaxDateForm();
    users.getUsers();
})  