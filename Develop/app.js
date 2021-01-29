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