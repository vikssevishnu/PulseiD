import express from 'express';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutes } from './common/common.routes';
import { RulesetRoutes } from './ruleset/ruleset.routes';
import debug from 'debug';
import { TransactionRoutes } from './transactions/transaction.routes';
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

const app:express.Application = express();
const server:http.Server=http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutes>=[];
const debugLog:debug.IDebugger=debug('app');

app.use(bodyparser.json());
app.use(cors());

let swaggerFile: any = (process.cwd()+"/swagger.json");
let swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
//slet customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
let swaggerDocument = JSON.parse(swaggerData);

const loggerOptions:expressWinston.LoggerOptions={
    transports:[new winston.transports.Console()],
    format:winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all:true})
    ),
};

if(!process.env.DEBUG){
    loggerOptions.meta=false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new RulesetRoutes(app));
routes.push(new TransactionRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutes) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });    
    console.log(runningMessage);
});

app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// handle undefined routes
app.use("*", (req, res, next) => {
res.send("Make sure url is correct!");
});