class SortUsers {
    constructor(users_list) {
        this.users = users_list;
    }
    id() {
        return this.users.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }
    fio() {
        return this.users.sort((a, b) => {
            const a_fio = new ParsePrintedData(a).fio()
            const b_fio = new ParsePrintedData(b).fio()
            return a_fio.localeCompare(b_fio)
        })
    }
    birthday() {
        return this.users.sort((a, b) => Date.parse(a.birthday) - Date.parse(b.birthday))
    }
    studyStart() {
        return this.users.sort((a, b) => parseInt(a.studyStart) - parseInt(b.studyStart));
    }
    faculty() {
        return this.users.sort((a, b) => a.faculty.localeCompare(b.faculty));
    }
}