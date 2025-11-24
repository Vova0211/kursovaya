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