import rulesetService from "../services/ruleset.service";
import debug from "debug";
import express from 'express';

const log: debug.IDebugger = debug('app:ruleset-controller');

class RulesetController{

    async listRulesets(req:express.Request,res:express.Response){
        const {limit,pageno} = req.body;
        const rulesets = await rulesetService.list(limit,pageno);
        res.status(200).send(rulesets);
    }

    async getRulesetsById(req:express.Request,res:express.Response){
        const ruleset = await rulesetService.readById(req.body.id);
        res.status(200).send(ruleset);
    }

    async createRuleset(req:express.Request,res:express.Response){
        const rulesetId = await rulesetService.create(req.body);
        res.status(201).send({id:rulesetId});
    }

    async getRulesetByTranDate(req:express.Request,res:express.Response){
        const rulesets = await rulesetService.readByTranDate(req.body.tranDate);
        res.status(200).send(rulesets);
    }
}

export default new RulesetController();

