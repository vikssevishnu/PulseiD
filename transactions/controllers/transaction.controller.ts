import transactionService from "../services/transaction.service";
import debug from "debug";
import express from 'express';

const log: debug.IDebugger = debug('app:transaction-controller');

class TransactionController{

    async listTransactinos(req:express.Request,res:express.Response){
        const {limit,pageno} = req.body;
        const transactions = await transactionService.list(limit,pageno);
        res.status(200).send(transactions);
    }

    async getCashbackTransactions(req:express.Request,res:express.Response){
        const cashbackTrans = await transactionService.readCashbackTransaction();
        let result:any = [];
        cashbackTrans.map(tran=>{
           result.push({"transactionId":tran.id,"cashback":tran.amount});
        });
        res.status(200).send(result);
    }

    async recordTransactions(req:express.Request,res:express.Response){
        await transactionService.recordTransaction(req.body);
        res.status(201).send('Transaction recorded successfully');
    }
}

export default new TransactionController();

