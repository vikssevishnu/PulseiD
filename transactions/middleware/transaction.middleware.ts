import express from 'express';
import transactionService from '../services/transaction.service';
import debug from 'debug';
import rulesetService from '../../ruleset/services/ruleset.service';
import CustomRequest from '../../common/interface/request.interface';
import { RulesetDTO } from '../../ruleset/dto/rulesetdto';
import { TransactionDTO } from '../dto/transactiondto';

const log:debug.IDebugger=debug('app:transaction-middelware');

class TransactionMiddleware{
    
    async validateRecordTransactionReqFields(req:CustomRequest,res:express.Response,next:express.NextFunction){
        if(req.body && req.body.id && req.body.date){
            next();
        }else{
            res.status(400).send({
                error:'Missing required fields ID/Date.'
            });
        }
    }

    async validateTransactionIdExists(req:CustomRequest,res:express.Response,next:express.NextFunction){
        const transaction = await transactionService.getTransactionById(req.body.id);
        if(transaction){
            res.status(400).send( {error: `Transaction Id ${req.body.id} already exists`});
        }else{
            next();
        }
    }

    async fetchRulesetCashback(req:CustomRequest,res:express.Response,next:express.NextFunction){
        const rulesets = await rulesetService.readByTranDate(req.body.date);
        let ruleset;
        if(rulesets){
            rulesets.sort((rulea,ruleb)=>ruleb.cashback! - rulea.cashback!); //get max cashback
            
            for(let i=0;i<rulesets.length;i++){ 

                const redemptionLimit = rulesets[i]?.redemptionLimit;
                if(redemptionLimit){
                    const tranCount = rulesets[i]?.transactions;
                    if(tranCount && tranCount.length >= redemptionLimit){
                        continue; // redemption limit reached move on to next ruleset item;
                    }else{
                        ruleset = rulesets[i];  //ruleset found.
                        break;
                    }
                }else{
                    ruleset = rulesets[i]; // no redemption limit set for the ruleset items
                    break;
                }
            }
        }else{
            ruleset = null; // transaction does not have cashback;
        }
        req.cashbackRuleset = ruleset ?? undefined;
        next();
    }

    async updateRulesetWithTransactionObj(req:CustomRequest,res:express.Response,next:express.NextFunction){
        const ruleset = req.cashbackRuleset;
        if(ruleset){
            if(!ruleset.transactions || ruleset.transactions.length == 0){
                ruleset.transactions = [];               
            }
            req.body.hasCashback = true;
            req.body.amount = ruleset.cashback;                            

            ruleset.transactions.push(req.body);

            const result = await rulesetService.patchRulesetTran(ruleset);
        }else{
            req.body.hasCashback=false;
            req.body.amount = 0;
        }

        next();
    }
}

export default new TransactionMiddleware();