import { Request } from "express";
import { RulesetDTO } from "../../ruleset/dto/rulesetdto";

interface CustomRequest extends Request{
    cashbackRuleset?:RulesetDTO;
}

export default CustomRequest;