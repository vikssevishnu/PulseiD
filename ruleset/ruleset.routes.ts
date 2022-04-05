import { CommonRoutes } from "../common/common.routes";
import express from "express";
import RulesetController from "./controllers/ruleset.controller";
import RuleSetMiddleware from './middleware/ruleset.middleware';

export class RulesetRoutes extends CommonRoutes{
    constructor(app:express.Application){
        super(app,'RulesetRoutes');
    }

    configureRoutes(){

        this.app.route('/ruleset')
            .get(RulesetController.listRulesets)
            .post(
                RuleSetMiddleware.validateRequiredCreateRulesetFields,
                RuleSetMiddleware.validateDateFields,
                RulesetController.createRuleset
                );
        
        this.app.param('id',RuleSetMiddleware.extractRulesetId);

        this.app.route('/ruleset/:id')
                .all(RuleSetMiddleware.validateRulesetIdExists)
                .get(RulesetController.getRulesetsById)
        
        return this.app;
    }
}
