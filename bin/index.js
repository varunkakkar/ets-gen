#!/usr/bin/env node
const fs = require('fs');
const readLine = require('readline');
const interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const package = require('./app/package.js')
const gitignore = require('./app/gitignore.js')
const indexFile = require('./app/index.js')
const config = require('./app/tsconfig.js')
const apiRouter = require('./app/routes/api.js')
const logger = require('./app/tools/logger.js')
const morgan = require('./app/middlewares/morgan.js')

//========================================================================================
//========================================================================================
//========================================================================================
const init = () =>{
    interface.question(
        "What will be your project name? => ",
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
                "Write a short & crisp description for your project(leave blank for empty) ? => ",
                (description) => {
                    interface.question(
                        "What is your name? => ",
                        (author) => {
                            interface.question(
                                "Choose your license type(leave blank for empty) ? => ",
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
        indexFile(project),
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
            configFile(project);
        }
    )
}
//========================================================================================
//========================================================================================
//========================================================================================
const configFile = (project) =>{
    fs.writeFile(`./${project}/tsconfig.json`,
    JSON.stringify(config(project),null,2),
        (err) => {
            if(err) throw err;
            console.log("tsconfig.json created");
            console.log("Project Created");
            console.log("Next Steps:");
            console.log("cd ./"+project);
            console.log("1. Run 'npm install'");
            console.log("2. Run 'npm run build'");
            console.log("3. Run 'npm run dev'");
            console.log("Production : ")
            console.log("4. Run 'npm run build'");
            console.log("5. Run 'npm start'");
        }
    )
}