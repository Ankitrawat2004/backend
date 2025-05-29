const figlet = require("figlet");
figlet("Hello World!!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

  //node _modules folder contains every installed dependency for our project.
  //package-lock.json it records the exact version of every installed dependency.
  //package.json file contains descriptive and functional metadata about a project,such as a name,version and dependencies
  