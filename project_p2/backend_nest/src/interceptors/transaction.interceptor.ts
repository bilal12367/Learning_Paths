import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { EntityManager } from "typeorm";


@Injectable()
export class TransactionInterceptor implements NestInterceptor {
    constructor(private readonly manager: EntityManager) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("Before ... ")
        const queryRunner = this.manager.connection.createQueryRunner()

        return new Observable((obs) => {
            queryRunner.startTransaction()

            next
                .handle()
                .toPromise()
                .then(async (res) => {
                    await queryRunner.commitTransaction()
                    obs.next(res)
                    obs.complete()
                })
                .catch(async(err) => {
                    await queryRunner.rollbackTransaction()
                    obs.error(err)
                })
                .finally(async() => {
                    await queryRunner.release()
                })
        })
    }

}