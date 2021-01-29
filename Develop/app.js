const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function askAway (){
    inquirer.prompt([
        {
            type: "checkbox",
            message: "What kind of teammember will you be adding? Please select only one.",
            choices: ["Manager", "Engineer", "Intern", "None"],
            name: "member"
        }
    ]).then(response => {
        if (response.member == "Manager") {
            manager();
        }
        else if (response.member == "Engineer") {
            engineer();
        }
        else if (response.member == "Intern") {
            intern();
        }
        else if (response.member == "None") {
            renderHTML();
        }
    })
}

function manager(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your manager?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is your manager's ID?",
            name: "managerID"
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber"
        },
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.officeNumber)
        teamMembers.push(manager);
        askAway();
    })
}
function engineer (){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your engineer?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is your engineer's ID?",
            name: "engineerID"
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "What is your engineer's github username?",
            name: "github"
        },
    ]).then(response => {
        const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.github)
        teamMembers.push(engineer);
        askAway();
    })
}
function intern (){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your intern?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is your intern's ID?",
            name: "internID"
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "What university does your intern attend?",
            name: "school"
        },
    ]).then(response => {
        const intern = new Intern(response.internName, response.internID, response.internEmail, response.school);
        teamMembers.push(intern);
        askAway();
    })
}

function renderHTML (){
    fs.writeFile(outputPath, render(teamMembers), err => {
        if (err) throw err;
        console.log("You're team page has successfully been generated!");
    })
}

askAway();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
