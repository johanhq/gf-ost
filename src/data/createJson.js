let csvToJson = require('convert-csv-to-json');

let fileInputName = 'pensum.csv';
let fileOutputName = 'pensum.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
