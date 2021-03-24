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

let functions = new sdk.Functions(client);

let name = 'test_function';
functions.create(name, [], 'node-14.5')
      .then((func_res) => {
            let func_id = func_res.$id;
            return func_id, functions.createTag(func_id, 'node test.js', fs.createReadStream('hello_world.tar.gz'))
      }).then((tag_res) => {
            let func_id = tag_res.functionId;
            let tag_id = tag_res.$id;
            return functions.updateTag(func_id, tag_id)
      }).then((update_res) => {
            console.log("Successfully created " + name);
      })
      .catch((error) => {
            console.log(error);
      });