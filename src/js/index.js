const users = new Users();

function setMaxDateForm() {
    const date = new Date();
    const birthday = document.querySelector('[name="birthday"]');
    const studyStart = document.querySelector('[name="studyStart"]');
    birthday.max = date.toLocaleDateString().replaceAll('/', '-');
    studyStart.max = date.getFullYear();
}

document.querySelectorAll('.t-head').forEach(th => {
    th.addEventListener('click', e => {
        document.querySelectorAll('th').forEach(e => e.classList.remove('th_selected'));
        e.target.classList.add("th_selected")
        const key = th.dataset.name;
        users.sort(key);
    })
})
document.getElementById('form').addEventListener('submit', eventForm);
document.getElementById('find-user').addEventListener('click', eventSearch);
document.getElementById('find-user_reset').addEventListener('click', e => {
    users.printUsers();
    e.target.parentNode.firstChild.value = "";
})
document.addEventListener('DOMContentLoaded', async e => {
    setMaxDateForm();
    users.getUsers();
})  