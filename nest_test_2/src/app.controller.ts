import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("test")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id/:docId")
  testPathParams(@Req() req: Request, @Param() params: any): string {
    console.log(params)
    return this.appService.getHello() + JSON.stringify(params);
  }

  @Get("query")
  testQuery(@Query("id") id: number) {
    return "Id = "+id
  }

  @Post("post")
  testPost(@Body() body: RegisterBody) {
    return this.appService.registerUser(body);
  }

}
