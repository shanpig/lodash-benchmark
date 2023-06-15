const fs = require('fs');

const writeToJson = (filename, jsonData) => {
  fs.writeFile(filename, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
};

module.exports = { writeToJson };
