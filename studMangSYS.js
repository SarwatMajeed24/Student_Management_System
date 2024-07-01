#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.courses = [];
        this.balance = 150;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(chalk.greenBright.bold(`\n\tBalance for ${this.name} : $${this.balance}`));
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.redBright.bold(`\n$${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.greenBright.bold(`\tRemaining balance: $${this.balance}`));
    }
    show_status() {
        console.log(chalk.redBright.bold(`\nStudent Name: ${this.name}\n Student ID: ${this.id}\n Courses Name: ${this.courses}\n Balance: ${this.balance}`));
    }
}
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.redBright(`\n\tStudent: ${name} added successfully. \n\tStudent ID: ${student.id}`));
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.greenBright.bold(`\n\t${student.name} enrolled in ${course} successfully!`));
        }
        else {
            console.log(chalk.blueBright("\n\tStudent not found.Please enter a correct student id"));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.blueBright.bold("\n\tStudent not found.\n\tPlease enter a correct student id"));
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.blueBright.bold("\n\tStudent not found.\n\tPlease enter a correct student id"));
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(chalk.redBright.bold("\n\t", "=".repeat(50)));
    console.log(chalk.redBright.bold("\n\t          Welcome to Student Management System"));
    console.log(chalk.redBright.bold("\n\t", "=".repeat(50)));
    let studentManager = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: (chalk.bgBlueBright.bold("\n\tSelect an option:")),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.yellowBright.bold("\nEnter student name:")),
                    }
                ]);
                studentManager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.yellowBright.bold("\nEnter student id:")),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: (chalk.yellowBright.bold("\nEnter course name:")),
                    }
                ]);
                studentManager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.yellowBright.bold("\nEnter student ID:")),
                    }
                ]);
                studentManager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.yellowBright.bold("\nEnter student id:")),
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: (chalk.yellowBright.bold("\nEnter the amount to pay:")),
                    }
                ]);
                studentManager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let staus_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.yellowBright.bold("\nEnter student id:")),
                    }
                ]);
                studentManager.show_student_status(staus_input.student_id);
                break;
            case "Exit":
                console.log(chalk.redBright.bold("\n\t", "=".repeat(50)));
                console.log(chalk.redBright.bold("\n\t            Thank you!        "));
                console.log(chalk.redBright.bold("\n\t", "=".repeat(50)));
                process.exit();
        }
    }
}
main();
