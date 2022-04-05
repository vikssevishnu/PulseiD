import debug from "debug";
import { TransactionDTO } from "../dto/transactiondto";

const log:debug.IDebugger=debug('app:in-memory-dao');

class TransactionDAO {
    transactions:Array<TransactionDTO>=[];

    constructor(){
        log('Created new instance of TransactionDAO');
    }

    
    async recordTransaction(transaction: TransactionDTO){               
        this.transactions.push(transaction);        
    }

    async getTransactions(limit:number,page:number){
        return this.transactions;
    }

    async getCashbackTransactions(){
        return this.transactions.filter((transaction:{hasCashback:boolean})=>transaction.hasCashback == true);
    }

    async getTransactionById(id:string){
        return this.transactions.find((transaction:{id:string})=>transaction.id === id);
    }
}

export default new TransactionDAO();