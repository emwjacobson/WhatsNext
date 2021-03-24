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

functions.create('test_function', [], 'node-14.5')
      .then((func_res) => {
            let func_id = func_res.$id;
            functions.createTag(func_id, 'node test.js', fs.createReadStream('hello_world.tar.gz'))
                  .then((tag_res) => {
                        let tag_id = tag_res.$id;
                        functions.updateTag(func_id, tag_id)
                              .then((update_res) => {
                                    console.log("Success");
                              })
                              .catch((error) => {
                                    console.log("Error updating function");
                                    console.log(error);
                              });
                  })
                  .catch((error) => {
                        console.log("Error creating tag");
                        console.log(error);
                  });
      })
      .catch((error) => {
            console.log("Error creating function");
            console.log(error);
      });