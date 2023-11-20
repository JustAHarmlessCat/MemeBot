const fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('./roles.json'));
}

function saveData(data) {
    fs.writeFileSync('./roles.json', JSON.stringify(data));
}

module.exports = {
    loadData,
    saveData
}