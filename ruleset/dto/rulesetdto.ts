import { TransactionDTO } from "../../transactions/dto/transactiondto";

export interface RulesetDTO
{
    id:string;
    startDate?:string;
    endDate?:string;
    cashback?:number;
    redemptionLimit?:number;
    transactions?:TransactionDTO[]
}