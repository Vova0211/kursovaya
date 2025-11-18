class Users {
    static url = 'http://localhost:3000/api/students';
    static async sendUser(user) {
        try {
            const headers = { method: "POST", body: JSON.stringify(user), headers: {"Content-Type": "application/json"} }
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
            user.querySelector(".delete_user").addEventListener('click', eventDelete);
            table_place.appendChild(user);
        })
    }
    
    sort(type) {
        const functions = { fio: e => e.sort((a, b) => new ParsePrintedData(a).fio() - new ParsePrintedData(b).fio())/*, birthday, studyStart, faculty */};
        const users_copy = this.users_list;
        
        console.log(functions[type](users_copy));
        
        this.printUsers(users_copy);
    }
}