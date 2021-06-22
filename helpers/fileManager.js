const fs = require('fs');


const filePath = './db/data.json';

const save = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

const read = () => {
    if (!fs.existsSync(filePath)) return null;

    const result = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(result);

    return data;
};

module.exports = {
    save,
    read
};
