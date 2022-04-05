import shortid from "shortid";
import debug from "debug";
import { RulesetDTO } from "../dto/rulesetdto";

const log:debug.IDebugger=debug('app:in-memory-dao');

class RulesetDAO{
    rulesets:Array<RulesetDTO>=[];

    constructor(){
        log('Created new instance of RulesetDAO');
    }

    
    async createRuleset(ruleset: RulesetDTO){
        ruleset.id = shortid.generate();
        this.rulesets.push(ruleset);
        return ruleset.id;
    }

    async getRulesets(){
        return this.rulesets;
    }

    async getRulesetsById(rulesetid:string){
        return this.rulesets.find((ruleset:{id:string})=>ruleset.id == rulesetid)
    }

    async getRulesetsByDate(tranDate:string){
        return this.rulesets.filter(ruleset=>{
            if(new Date(ruleset.startDate!) <= new Date(tranDate) && new Date(ruleset.endDate!) >= new Date(tranDate)){
                return ruleset;
            }
        })
    }

    async updateCashbackTransactions(ruleset:RulesetDTO){
        const index = this.rulesets.findIndex((obj:{id:string})=>obj.id === ruleset.id)
        this.rulesets.splice(index,1,ruleset);
        return true;
    }
}


export default new RulesetDAO();