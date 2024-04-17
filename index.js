// Your code here

//Employee record
function employeRecord(firstName, familyName, title, payPerHour) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Employee records from nested arrays
function employeRecords(employeeData) {
  return employeeData.map(employee => employeRecord(...employee));
}

// TimeIn event for an employee
function timeIn(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

// TimeOut event for an employee
function timeOut(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date).hour;
  const timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
  return (timeOut - timeIn) / 100; 
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Payment owed for all dates
function allWages(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

// Calculate payroll for all employees
function calcPayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWages(employee), 0);
}
