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


// Create dummy user
let users = new sdk.Users(client);

users.list("name=Guest")
.then((user_list) => {
      if (user_list.sum == 0) {
            return users.create('guest@guest.com', 'guestguest', 'guest');
      } else {
            return user_list.users[0];
      }
}).then((user) => {
      console.log("Successfully created guest user!");
}).catch((error) => {
      console.log("Error creating guest user");
      console.log(error);
})


// Create Databases
let database = new sdk.Database(client);

let classes_db_name = "classes";
database.listCollections(classes_db_name)
.then((collections) => {
      if (collections.sum == 0) {
            return database.createCollection(classes_db_name, ["*"], ["*"], [
                  {label: 'name', key: 'name', type: 'text', default: '', required: true, array: false},
                  {label: 'info', key: 'info', type: 'text', default: '', required: false, array: true},
                  {label: 'links', key: 'links', type: 'wildcard', default: '', required: false, array: true}
            ]);
      } else {
            return collections.collections[0];
      }
}).then((create_res) => {
      console.log("Successfully created database: " + classes_db_name);
}).catch((error) => {
      console.log("Error creating database collection '" + classes_db_name + "'");
      console.log(error);
});

let entries_db_name = "entries";
database.listCollections(entries_db_name)
.then((collections) => {
      if (collections.sum == 0) {
            return database.createCollection(entries_db_name, ["*"], ["*"], [
                  {label: 'name', key: 'name', type: 'text', default: '', required: true, array: false},
                  {label: 'due_date', key: 'due_date', type: 'wildcard', default: '', required: true, array: false},
                  {label: 'category', key: 'category', type: 'wildcard', default: '', required: true, array: false},
                  {label: 'info', key: 'info', type: 'text', default: '', required: false, array: true},
                  {label: 'parent_class', key: 'parent_class', type: 'wildcard', default: '', required: false, array: false},
            ]);
      } else {
            return collections.collections[0];
      }
}).then((create_res) => {
      console.log("Successfully created database: " + entries_db_name);
}).catch((error) => {
      console.log("Error creating database collection '" + entries_db_name + "'");
      console.log(error);
});


// Create Cloud Functions
let functions = new sdk.Functions(client);

let test_name = 'test_function';
functions.list("name=" + test_name)
.then((funcs) => {
      if (funcs.sum == 0) {
            return functions.create(test_name, [], 'node-14.5');
      } else {
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
