import express from 'express';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutes } from './common/common.routes';
import { RulesetRoutes } from './ruleset/ruleset.routes';
import debug from 'debug';

const app:express.Application = express();
const server:http.Server=http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutes>=[];
const debugLog:debug.IDebugger=debug('app');

app.use(bodyparser.json());
app.use(cors());

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
