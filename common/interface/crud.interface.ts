export interface CRUD{
    list:(limit:number,page:number)=>Promise<any>;
    create:(resource:any)=>Promise<any>;
    readById:(id:string)=>Promise<any>;
}

export interface TransactionAPI{
    recordTransaction:(resource:any)=>Promise<any>;
    list:(limit:number,page:number)=>Promise<any>;
    readCashbackTransaction:()=>Promise<any>;
}