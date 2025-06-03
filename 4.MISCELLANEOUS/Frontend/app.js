const stu1={
    name:"adam",
    age:25,
    marks:96,
    getMarks:function(){
        return this.marks;
    },
};
const stu2={
    name:"eve",
    age:24,
    marks:93,
    getMarks:function(){
        return this.marks;
    },
};
const stu3={
    name:"casey",
    age:23,
    marks:99,
    getMarks:function(){
        return this.marks;
    },
};
//Object PROTOTYPES
//Prototypes are the mechanism by which js object inherits features from one another.

//it is like a single template object that all objects inherit methods and properties from without having
//thier own copy.

let arr1=[1,2,3];
let arr2=[1,2,3];
arr1.sayHello=()=>{
    console.log("Hello! ,i am arr");
};
arr2.sayHello=()=>{
    console.log("Heloo!, i am arr");
};
//access the prototype
//arr.__proto__ (refrence/copy object)
//Array.prototype(actual object)
//String.prototype

//Factory Functions
function PersonMaker(name,age){
    const person={
        name:name,
        age:age,
        talk(){
            console.log(`Hi , my name is ${this.name}`);
        },
    };
    return person;
}
//let p1=PersonMaker("ankit",21);//copy
//Constructors - return anything & start with capital letter

function Person(name,age){
   this.name=name;
   this.age=age;
   console.log(this);
}
Person.prototype.talk=function(){
    console.log(`Hi, my name is ${this.name}`);
};

//New operator 
//The new operator lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function.
let p1=new Person("ankit",21); //refer same copy
let p2=new Person("anuj",20);

//Classes => are a template for creating objects.
//the constructor method is a special method of a class for creating and initializing an object instance of that class.

class Personn{
    constructor(name,age){
        this.name = name;
        this.age=age;
    }
    talk(){
        console.log(`Hi , my name is${this.name}`);
    }
}
//creating an class object using new operator
let p3 = new Personn("arpit",30);

//Inheritance => is a mechanism taht allows us to create new classes on the basis of alredy existing classes.
class Personnn {
    constructor(name,age){
        console.log("person class constructor");
        this.name=name;
        this.age=age;
    }
    talk(){
        console.log(`Hi , I am ${this.name}`);
    }
}
class Student extends Personnn{
    constructor(name,age,marks){
        console.log("student class constructor");
        super(name,age); //parent class is being constructor called
        this.marks=marks;
    }
   
}

class Teacher extends Personnn{
    constructor(name,age,subject){
        super(name,age); //parent class is being constructor called
        this.subject=subject;
    }
 
}
class Mammal{//parent class
    constructor(name){
        this.name=name;
        this.type="warm-blooded";
    }eat(){
        console.log("I am eating");
    }
}
class Dog extends Mammal{//child class
    constructor(name){
        super(name);
    }
    bark(){
        console.log("wooff..");
    }
}
class Cat extends Mammal{
    constructor(name){
        super(name);
    }
    meow(){
        console.log("meow..");
    }
}
