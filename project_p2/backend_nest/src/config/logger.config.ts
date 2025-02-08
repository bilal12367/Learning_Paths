import { Logger } from "@nestjs/common";
import fs from 'fs'



export class TestLogger extends Logger {

    appendToFile(data: any, fileName: string) {
        data = JSON.stringify(data)
        if(!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs')
        }
        if(!fs.existsSync('./logs/' + fileName + '.log')) {
            fs.writeFileSync('./logs/' + fileName + '.log', '\n' + data.toString())    
        } else {
            fs.appendFileSync('./logs/' + fileName + '.log', '\n' + data.toString())
        }
    }

    error(message: unknown, stack?: unknown, context?: unknown, ...rest: unknown[]): void {
        this.appendToFile(message,'error')
        super.error(message,stack, context, ...rest)
    }

    log(message: unknown, context?: unknown, ...rest: unknown[]): void {
        this.appendToFile(message,'app')
        super.log(message, context, ...rest)
    }
}