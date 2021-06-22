const Task = require("./Task");


class TaskList {
    /**
     * _list = { uuid: '123qwdsdads-adsa-da' : {id: 12, description: 'desc', completed: 2021-06-12}}
     */
    constructor() {
        this._list = {};
    }

    // Getter - convierto el objeto listado en array para visualizarlo
    get listArr() {
        const list = [];

        Object.keys(this._list).forEach(key => list.push(this._list[key]));

        return list;
    }

    create(description = '') {
        const task = new Task(description);

        this._list[task.id] = task;
    }

    loadFileFromArray(tasks = []) {
        tasks.forEach(task => this._list[task.id] = task);
    }

    listAll() {
        this.listArr.forEach((task, index) => {
            const i = `${index + 1}.`.green;
            const {description, completed} = task;

            console.log(`${i} ${description} :: ${completed ? 'Completada'.green : 'Pendiente'.red}`);
        });
    }

    listByStatus(isCompleted = true) {
        this.listArr.forEach((task, index) => {
            const i = `${index + 1}.`.green;
            const { description, completed } = task;

            if (isCompleted) {
                if (completed) {
                    console.log(`${i} ${description} :: ${completed.green}`);
                }
            } else {
                if (!completed) {
                    console.log(`${i} ${description} :: ${'Pendiente'.red}`);
                }
            }
        });
    }

    delete(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];

            if (!task.completed) {
                task.completed = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completed = null;
            }
        });
    }
}

module.exports = TaskList;
