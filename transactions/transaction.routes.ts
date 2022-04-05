import { CommonRoutes } from "../common/common.routes";
import express from "express";
import TransactionController from "./controllers/transaction.controller";
import TransactionMiddleware from "./middleware/transaction.middleware";

export class TransactionRoutes extends CommonRoutes{
    constructor(app:express.Application){
        super(app,'Transaction Routes');
    }

    configureRoutes(){

        this.app.route('/transaction')   
            .get(TransactionController.listTransactinos)        
            .post(
                TransactionMiddleware.validateRecordTransactionReqFields,
                TransactionMiddleware.validateTransactionIdExists,
                TransactionMiddleware.fetchRulesetCashback,
                TransactionMiddleware.updateRulesetWithTransactionObj,
                TransactionController.recordTransactions
                );
                

        this.app.route('/cashback')                
                .get(TransactionController.getCashbackTransactions)
        
        return this.app;
    }
}
