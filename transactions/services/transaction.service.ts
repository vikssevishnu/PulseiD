import { TransactionAPI } from "../../common/interface/crud.interface";
import { TransactionDTO } from "../dto/transactiondto";
import TransactionDAO from "../dao/transactiondao";

class TransactionService implements TransactionAPI{

    async recordTransaction(resource: TransactionDTO) {
        return TransactionDAO.recordTransaction(resource);
    }
    
    async list(limit: number, page: number){
        return TransactionDAO.getTransactions(limit,page);
    }

    async readCashbackTransaction(){
        return TransactionDAO.getCashbackTransactions();
    }

    async getTransactionById(id:string){
        return TransactionDAO.getTransactionById(id);
    }
}

export default new TransactionService();