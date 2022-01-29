#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

// console.log(chalk.bgGreen("Hi Mom"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log("This is the instructions to the game");

}

async function askName()
{
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player";
        },
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: 'list',
        message: 'What is the color of my underwear?',
        choices: [
            "Blue",
            "Red",
            "Yellow",
            "Pink",
        ],
    });

    return handleAnswer(answers.question_1 == "Pink");

}

async function question2() {
    const answers = await inquirer.prompt({
        name: `question_2`,
        type: `confirm`,
        message: `You're doing pretty good for yourself here`,
    });
    return handleAnswer(true);
}

async function question3() {
    const answers = await inquirer.prompt({
        name: `question_3`,
        type: `password`,
        message: `What is the password?`,
        mask: ``,
        validate: requireSamePassword,  
    })
}
const requireSamePassword = (value) => {
    if (value == "password")
    {
        console.log(chalk.bgBlack(chalk.magenta(`You got the right password!`)));

        return true;
    }
    return `Password is incorrect`;
};

async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking Answer").start();
    await sleep();
    
    if (isCorrect) {
        spinner.success({text: `Nice work ${playerName}.`});
    }
    else
    {
        spinner.error({text: `Game Over, you lose ${playerName}!`});
        process.exit(1);
    }
}

function win() {
    console.clear();
    const msg = `Congrats, ${playerName}, !\n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome()
await askName()
await question1()
await question2()
await question3()
win()

