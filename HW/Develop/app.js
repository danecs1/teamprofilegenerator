const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

const teamArray = [];

//questions for manager
const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Please enter the name of the manager of this team or your name if you are the manager'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'Please enter the id of the manager of this team or your id if you are the manager'
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'Please enter the email address of the manager of this team or your email address if you are the manager'
    },
    {
        type: 'input',
        name: 'office',
        message: 'Please enter the office number of the manager of this team or your office number if you are the manager'
    }
]

//questions for engineer
const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter the name of this engineer'
    },
    {
        type: 'input',
        name: 'engineerID',
        message: 'Enter the ID of this engineer'
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter the email address of this engineer'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the github address of this engineer'
    }
]


//questions for intern
const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of this intern'
    },
    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID of this intern'
    },
    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email address of this intern'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the school of this intern oterwise type "N/A" '
    }
]

// this question will prompt the manager if they want to add another engineer or intern or if they are done with creating their team.
const anotherQuestion = [
    {
        type: 'list',
        name: 'anotherEmployee',
        message: 'Select the type of team member you would like to add next and if you are done, select "Done" to generate your team ',
        choices: ['Engineer', 'Intern', 'Done']
    }
]


/**
 * This function prompts the manager
 * to supply answers to questions
 * in managerQuestions array
 */
function managerPrompt() {
    inquirer.prompt(managerQuestions).then((response) => {
        const { managerName, managerID, managerEmail, office } = response;
        // create a new manager object/instance
        const manager = new Manager(managerName, managerID, managerEmail, office);
        teamArray.push(manager);
        next();
    })
}


/**
 * This function prompts the manager
 * to answer questions pertaining
 * to the engineerQuestions array
 */
function engineerPrompt() {
    inquirer.prompt(engineerQuestions).then((response) => {
        const { engineerName, engineerID, engineerEmail, github } = response;
        //create a new instance of an engineer
        const engineer = new Engineer(engineerName, engineerID, engineerEmail, github);
        teamArray.push(engineer);
        next();
    })
}

/**
 * This function prompts the manager
 * to answer questions pertaining
 * to the intern(internQuestions)
 */
function internPrompt() {
    inquirer.prompt(internQuestions).then((response) => {
        const { internName, internID, internEmail, school } = response;
        // create a new instance of an intern
        const intern = new Intern(internName, internID, internEmail, school);
        teamArray.push(intern);
        next();
    })
}

/**
 * This function prompts the manager
 * to select the next type of
 * employee they are adding
 * it supplies answers to the anotherQuestion array
 */
function next() {
    inquirer.prompt(anotherQuestion).then((response) => {
        if (response.anotherEmployee === 'Engineer') {
            engineerPrompt();
            return;
        }
        if (response.anotherEmployee === 'Intern') {
            internPrompt();
            return;
        }
        console.log('Done creating your team!')
        makeTeam();
    })
}

/**
 * This function is responsible
 * for making the file(team.html)
 */
function makeTeam() {
    fs.writeFile(outputPath, render(teamArray), (err) => {
        if (err) {
            return console.log('ERR', err);
        }
    })
}

//this initiates the whole CLI process
managerPrompt();