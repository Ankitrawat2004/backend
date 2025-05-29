import { sum ,PI } from "./mathh.js";
import {generate } from "random-words";
console.log(sum(1,2));
console.log(generate());
//require vs import
// import{sum} from "./math.js"
// we cant selectively lead only the pieces we need with require but with import, we can selectively lead only the pieces we need,which can save memory.
 //Loading is synchronous for 'require' but can be asynchronous for'import'.
 //  To import => first export then type="module"(in package.json)