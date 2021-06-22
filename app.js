require('colors');
const { 
    inquirerMenu, 
    pause, 
    readInput, 
    listTasksDelete, 
    confirm,
    listChecklist
} = require('./helpers/inquirer');
const { save, read } = require('./helpers/fileManager');
const TaskList = require('./models/TaskList');


const main = async () => {
    let option = ''; 
    const tasks = new TaskList();

    const tasksDB = read();

    if (tasksDB) {
        tasks.loadFileFromArray(tasksDB);
    }

    do {
        option = await inquirerMenu();

        switch (option) {
            case '1':
                const description = await readInput('Descripción:');
                tasks.create(description);
                break;
            case '2':
                tasks.listAll();
                break;
            case '3':
                tasks.listByStatus(true);
                break;
            case '4':
                tasks.listByStatus(false);
                break;
            case '5':
                const ids = await listChecklist(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await listTasksDelete(tasks.listArr);

                if (id !== '0') {
                    const result = await confirm('Seguro de borrarlo?');
    
                    if (result) {
                        tasks.delete(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        save(tasks.listArr);

        await pause();
                
        // if (option !== '0') await pause();
    } while (option !== '0');
};

main();
