const users = new Users();

function setMaxDateForm() {
    const date = new Date();
    const birthday = document.querySelector('[name="birthday"]');
    const studyStart = document.querySelector('[name="studyStart"]');
    birthday.max = date.toLocaleDateString().replaceAll('/', '-');
    studyStart.max = date.getFullYear();
}

function eventForm_addUser(event) {
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

function eventDeleteUser(event) {
    const id = event.target.parentNode.getAttribute('id');
    Users.deleteUser(id);
    
    users.getUsers();
}

function eventForm_findUsers(event) {
    event.preventDefault();
    const inp = event.target.param;
    const param = event.target.param.value;
    inp.value = "";

    users.getUsers(param);
}

function eventForm_resetUsers(event) {
    event.preventDefault();

    users.printUsers();
}

function eventTh_sort(event, th_elem) {
    document.querySelectorAll('th').forEach(e => e.classList.remove('th_selected'));
    event.target.classList.add("th_selected")
    const key = th_elem.dataset.name;

    users.sort(key);
}

table_heads.forEach(th => {
    th.addEventListener('click', e => {eventTh_sort(e, th)})})
add_user_form.addEventListener('submit', eventForm_addUser);
find_users_form.addEventListener('submit', eventForm_findUsers);
find_users_form.addEventListener('reset', eventForm_resetUsers);
document.addEventListener('DOMContentLoaded', async e => {
    setMaxDateForm();
    users.getUsers();
})  