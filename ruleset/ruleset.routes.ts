import { CommonRoutes } from "../common/common.routes";
import express from "express";

export class RulesetRoutes extends CommonRoutes{
    constructor(app:express.Application){
        super(app,'RulesetRoutes');
    }

    configureRoutes(){

        this.app.route('/ruleset')
            .get((req:express.Request,res:express.Response)=>{
                res.status(200).send('List of rulessets in the system');
            })
            .post((req:express.Request,res:express.Response)=>{
                res.status(201).send('ruleset created');
            });

        return this.app;
    }
}
