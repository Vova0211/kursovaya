function countYears(startYear, endYear, round = 'floor') {
    return Math[round]((endYear-startYear) / (365 * 24 * 60 * 60 * 1000))
}
class ParsePrintedData {
    constructor(user) {
        this.data = user;
    }
    id() {
        return this.data.id;
    }
    faculty() {
        return this.data.faculty;
    }
    fio() {
        const { surname, name, lastname } = this.data;
        return `${surname} ${name} ${lastname}`;
    }
    birthday() { 
        const date = this.data.birthday;
        const year = new Date()
        const birthday_date = new Date(date);
        const age = countYears(birthday_date, year);
        return `${birthday_date.toLocaleDateString().replaceAll("/", '.')} (${age} лет)`
    }
    studyStart() {
        const date = this.data.studyStart;
        const year = new Date(); 
        const start = new Date(date, 8, 1);
        const course = countYears(start, year, 'ceil') <= 4 ? countYears(start, year, 'ceil') + " курс" : "Закончил";
        return `${date}-${parseInt(date)+4} (${course})`;
    }
}