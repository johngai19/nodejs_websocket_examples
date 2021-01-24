import { Controller,Get } from '@nestjs/common';
import { SkClientService} from './sk-client.service';

@Controller('sk-client')
export class SkClientController {
    constructor(private readonly skClientService:SkClientService){}
    @Get()
    getAll():string{
        return this.skClientService.getAll();
    }

    @Get('sendTerminate')
    sendTerminate(){
        return this.skClientService.sendTerminate();
    }

    @Get('getdata')
    getData(){
        return this.skClientService.getData();
    }
}
