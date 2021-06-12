const getDate = require("./get-date");
const getTime = require("./get-time");

/// CONSOLE.LOG REPLACEMENT THAT PREPENDS DATE AND TIME
const originalConsoleLog = console.log;
console.log = function () {
  originalConsoleLog.apply(console, [getDate(), getTime(), ...arguments]);
};
