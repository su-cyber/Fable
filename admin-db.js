// Select the database to use
use('test');

// Update operation to add the "all_mounts" field to all documents in the "profilemodels" collection
db.getCollection('profilemodels').updateMany(
  // Filter: Match all documents
  {},
  // Update: Set the value of "all_mounts" field to a default value
  { $set: { "all_mounts": [] } }
);
