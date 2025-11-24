class Users {
    constructor(users_list = []) {
        this.data = users_list;
        this.users_list;
    }

    static async sendUser(user) {
        try {
            const headers = { method: "POST", body: JSON.stringify(user), headers: { "Content-Type": "application/json" } }
            const ans = await fetch(url, headers);
            return ans.status;
        } catch(error) {
            console.log(error);
        }
    }

    static async deleteUser(id) {
        try {
            const headers = { method: "DELETE" };
            const ans = await fetch(`${url}/${id}`, headers);
            return ans.status;
        } catch(error) {
            console.log(error);
        }
    }

    async getUsers(param = '') {
        try {
            const ans = await fetch(url + `?search=${param}`);
            const data = await ans.json();
            if (param == '') this.data = data;
            this.printUsers(data);
        } catch(error) {
            console.log(error);
        }
    }

    printUsers(users = this.data) {
        if (users.length == 0) return;
        this.users_list = users;
        document.querySelectorAll('.user').forEach(user => user.remove());
        const temp_user = document.getElementById("temp-user_row").content;
        const table_place = document.getElementById("table-body");
        const keys = ['id', 'fio', 'birthday', 'studyStart', 'faculty'];
        users.forEach(user_data => {
            const user = temp_user.cloneNode(true);
            const parser = new ParsePrintedData(user_data);
            keys.forEach(key => {
                user.querySelector('.' + key).textContent = parser[key]();
            })
            user.querySelector('.actions').setAttribute('id', user_data.id);
            user.querySelector(".delete_user").addEventListener('click', eventDeleteUser);
            table_place.appendChild(user);
        })
    }
    
    sort(type) {
        const sorter = new SortUsers(this.users_list);
        this.printUsers(sorter[type]());
    }
}