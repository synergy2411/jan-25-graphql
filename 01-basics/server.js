console.log("Hello NodeJS!!");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("Program ends");
