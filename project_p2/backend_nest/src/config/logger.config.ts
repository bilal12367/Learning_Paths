import { Logger } from "@nestjs/common";
import fs from 'fs'



export class TestLogger extends Logger {

    appendToFile(data: any, fileName: string,logLevel: 'log' | 'error' = 'log') {
        data = JSON.stringify(data)
        let date = new Date()
        let dateLog = `${date.toISOString()} [level]=${logLevel}      `
        // let dateLog = `[${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${date.getDay()} [level]= ${logLevel}      `
        data = dateLog + data
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
        this.appendToFile(message,'error', 'error')
        super.error(message,stack, context, ...rest)
    }

    customLog(message: any, fileName: string = 'log'): void {
        this.appendToFile(message, fileName, 'log')
        super.log(message)
    }

    log(message: unknown, context?: unknown, ...rest: unknown[]): void {
        this.appendToFile(message,'app')
        super.log(message, context, ...rest)
    }
}