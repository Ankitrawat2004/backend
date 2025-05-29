let n = 5;
for( let i=0;i<n;i++){
    console.log("hello " ,i);
}
 console.log(process.argv);
//process: this object provides information about,and control over,the current Node.js process.
//process.argv:returns an array containing the command -line argumnets passed when the Node.js process was launched.
let args = process.argv;

for(let i =2;i<args.length;i++){
    console.log("hello to" ,args[i]);
}

const math= require("./math");
console.log(math);
console.log(math.sum(2,2));
console.log(math.g);

const info=require("./1Fruits");
console.log(info);
const figlet = require("figlet");
figlet("Hello World!!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });



// //NPM (Node Package Manager)
// // npm is the standard package manager for Node.js
// // npm is a library of package(package store)
// // command line tool (access package to the developer through command line tool)

// let args=process.argv;
// for(let i =2;i<args.length;i++){
//     console.log("hello to ",args[i]);
// }

//| If you want to use…          | Do this...                                    |
// | ---------------------------- | --------------------------------------------- |
//`import` / `export`          | Keep `"type": "module"` in `package.json`     |
// `require` / `module.exports` | Remove `"type": "module"` or use `.cjs` files |

