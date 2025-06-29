import { Module } from "@nestjs/common";
import { TransactionInterceptor } from "./transaction.interceptor";



@Module({
    providers: [TransactionInterceptor],
    exports: [TransactionInterceptor]
})

export class InterceptorModule  {}