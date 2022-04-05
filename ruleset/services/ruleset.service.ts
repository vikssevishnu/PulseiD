import { CRUD } from "../../common/interface/crud.interface";
import RulesetDAO from "../dao/rulesetdao";
import { RulesetDTO } from "../dto/rulesetdto";


class RulesetService implements CRUD{
    
    async list(limit: number, page: number){
        return RulesetDAO.getRulesets();
    }

    async create(resource: RulesetDTO){
        return RulesetDAO.createRuleset(resource);
    }

    async readById(id: string){
        return RulesetDAO.getRulesetsById(id);
    }
    
    async readByTranDate(tranDate:string){
        return RulesetDAO.getRulesetsByDate(tranDate);
    }

    async patchRulesetTran(ruleset:RulesetDTO){
        return RulesetDAO.updateCashbackTransactions(ruleset);
    }
}

export default new RulesetService();