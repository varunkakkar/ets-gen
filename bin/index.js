#!/usr/bin/env node
const fs = require('fs');
const readLine = require('readline');
const interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const package = require('./app/package.js')
const gitignore = require('./app/gitignore.js')
const index = require('./app/index.js')
const apiRouter = require('./app/routes/api.js')
const logger = require('./app/tools/logger.js')
const morgan = require('./app/middlewares/morgan.js')

//========================================================================================
//========================================================================================
//========================================================================================
const init = () =>{
    interface.question(
        "What will be your project name?",
        (project) => {
            if(project.length === 0){
                console.log("Project name cannot be empty");
                return interface.close();
            }
            if(fs.existsSync(project)){
                console.log("Project already exists");
                return interface.close();
            }
            interface.question(
                "What will be your project description?",
                (description) => {
                    interface.question(
                        "What is your name?",
                        (author) => {
                            interface.question(
                                "What is your license?",
                                (license) => {
                                    interface.close();
                                    fs.mkdirSync(`./${project}`);
                                    json(project,description,author,license);
                                    console.log("Project Initiated");
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}
init();
//========================================================================================
//========================================================================================
//========================================================================================
const json = (project,description,author,license) =>{
    fs.writeFile(`./${project}/package.json`,
        JSON.stringify(package(project,description,author,license),null,2),
        (err) => {
            if(err) throw err;
            console.log("package.json created");
            fs.mkdirSync(`./${project}/routes`);
            fs.mkdirSync(`./${project}/tools`);
            fs.mkdirSync(`./${project}/middlewares`);
            index(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const index = (project) =>{
    fs.writeFile(`./${project}/index.ts`,
        index(project),
        (err) => {
            if(err) throw err;
            console.log("index.ts created");
            morganFile(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const morganFile = (project) =>{
    fs.writeFile(`./${project}/middlewares/morgan.ts`,
        morgan(project),
        (err) => {
            if(err) throw err;
            console.log("morgan.ts created");
            loggerFile(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const loggerFile = (project) =>{
    fs.writeFile(`./${project}/tools/logger.ts`,
        logger(project),
        (err) => {
            if(err) throw err;
            console.log("logger.ts created");
            apiRouterFile(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const apiRouterFile = (project) =>{
    fs.writeFile(`./${project}/routes/api.ts`,
        apiRouter(project),
        (err) => {
            if(err) throw err;
            console.log("api.ts created");
            gitignoreFile(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const gitignoreFile = (project) =>{
    fs.writeFile(`./${project}/.gitignore`,
        gitignore(project),
        (err) => {
            if(err) throw err;
            console.log("gitignore created");
            console.log("Project created");
            interface.close();
        }
    )
}