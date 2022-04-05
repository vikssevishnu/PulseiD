import express from 'express';
import rulesetService from '../services/ruleset.service';
import debug from 'debug';

const log:debug.IDebugger=debug('app:ruleset-middelware');

class RulesetMiddleware{

    async validateRequiredCreateRulesetFields(req:express.Request,res:express.Response,next:express.NextFunction){
        if(req.body && req.body.startDate && req.body.endDate && req.body.cashback){
            next();
        }            
        else{
            res.status(400).send({
                error : 'Missing required fields StartDate/EndDate/Cashback.'
            });
        }

    }

    async validateRequierdGetRulesetByIdFields(req:express.Request,res:express.Response,next:express.NextFunction){
        if(req.body && req.body.id){
            next();
        }else{
            res.status(400).send({
                error:'Missing required field ruleset id.'
            })
        }
    }

    async validateDateFields(req:express.Request,res:express.Response,next:express.NextFunction){
        const {startDate,endDate} = req.body;
        if(new Date(startDate) >  new Date(endDate)){
            res.status(400).send({
                error:'Start date cannot be greated than End date.'
            })
        }else{
            next();
        }
    }

    async validateRulesetIdExists(req:express.Request,res:express.Response,next:express.NextFunction){
        const ruleset = await rulesetService.readById(req.params.id);
        if(ruleset){
            next();
        }else{
            res.status(404).send({
                error : `Ruleset ID ${req.params.id} not found.`
            })
        }
    }

    async extractRulesetId(req:express.Request,res:express.Response,next:express.NextFunction){
        req.body.id=req.params.id;
        next();
    }

}

export default new RulesetMiddleware();
