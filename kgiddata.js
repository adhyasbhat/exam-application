
const csvToJson = require('convert-csv-to-json');
const mongoose = require('mongoose');
const KGIDCandidate = require('./src/Modules/kgidcandidateModule');

const csvFilePath = './KGIDuserdetails.csv';
const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(csvFilePath);

console.log(`Total records to insert: ${json.length}`); // Log total records

// Define the batch insertion function
const batchInsert = async (data, batchSize = 100) => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1}: ${batch.length} records`); // Log batch size
    try {
      const result = await KGIDCandidate.insertMany(batch, { ordered: false });
      console.log(`Inserted batch ${i / batchSize + 1}`, result.insertedCount); // Log inserted count
    } catch (err) {
      console.error(`Failed to insert batch ${i / batchSize + 1}:`, err.message);
      console.error('Batch data:', batch); // Log the batch that failed
    }
  }
};

// Connect to MongoDB and start the data insertion
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Exam", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log("Connected to MongoDB");

    await batchInsert(json);
    console.log("Data insertion completed");

    // Optionally close the database connection after insertion
    mongoose.connection.close();
  } catch (error) {
    console.error("Error in database connection or data insertion:", error);
  }
};

start();
