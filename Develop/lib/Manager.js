// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, office){
        super(name, id, email, info);
        this.office = office;
    }
}

module.exports = Manager;