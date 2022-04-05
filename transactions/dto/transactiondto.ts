export interface TransactionDTO{
    id:string;
    date:string;
    customerId?:string;
    amount:number;
    hasCashback:boolean;
}