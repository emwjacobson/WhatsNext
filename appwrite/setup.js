import sdk from 'node-appwrite';
import fs from 'fs';

let endpoint = process.env.ENDPOINT
let project_id = process.env.PROJECT_ID
let secret_key = process.env.SECRET_KEY

let client = new sdk.Client();
client.setEndpoint(endpoint)
      .setSelfSigned(true) // Remove later
      .setProject(project_id)
      .setKey(secret_key);

// // Create Database Collections
// let database = new sdk.Database(client);

// let classes_db_name = "classes"
// database.createCollection(classes_db_name, ["*"], ["*"], [])
//       .then((create_res) => {
//             console.log("Successfully created database: " + classes_db_name);
//       })
//       .catch((error) => {
//             console.log("Error creating database collection '" + classes_db_name + "'");
//             console.log(error);
//       });


// Create Cloud Functions
let functions = new sdk.Functions(client);

let test_name = 'test_function';
functions.list("name=" + test_name)
.then((funcs) => {
      if (funcs.sum == 0) {
            return functions.create(test_name, [], 'node-14.5');
      } else {
            console.log("Cloud function '" + test_name + "' already exists");
            return funcs.functions[0];
      }
}).then((func_res) => {
      return functions.createTag(func_res.$id, 'node test.js', fs.createReadStream('hello_world.tar.gz'));
}).then((tag_res) => {
      return functions.updateTag(tag_res.functionId, tag_res.$id);
}).then((update_res) => {
      console.log("Successfully created function: " + test_name);
}).catch((error) => {
      console.log(error)
});
