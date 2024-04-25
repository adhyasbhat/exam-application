
let csvToJson = require('convert-csv-to-json');
const {q10Schema} = require('./config.js');

const csvFilePath = './questions.csv';
const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(csvFilePath)
console.log(json);
q10Schema.insertMany(json)
  .then((result) => {
    console.log('Inserted documents successfully:', result);
    // Optionally, close the database connection if needed
  })
  .catch((err) => {
    console.error('Failed to insert documents:', err);
    // Optionally, handle the error
  });