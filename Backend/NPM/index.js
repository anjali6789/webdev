// Default export - no curly braces needed
// The sillyname package exports one main function as the default
// You can name it whatever you want when importing
import generateName from "sillyname";

var sillyName = generateName();

console.log(`My name is ${sillyName}.`);

// Named export - curly braces required for destructuring
// The superheroes package exports multiple functions/values
// You need to specify exactly which one you want
import {randomSuperhero} from "superheroes";

const name = randomSuperhero();
console.log(`I am ${name}!`);   