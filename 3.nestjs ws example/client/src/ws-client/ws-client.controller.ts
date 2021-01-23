import { Controller,Get } from '@nestjs/common';
import {WsClientService} from './ws-client.service';

@Controller('ws-client')
export class WsClientController {
    constructor(private readonly wsClientService:WsClientService){}
    @Get()
    getAll():string{
        return this.wsClientService.getAll();
    }

    @Get('sendTerminate')
    sendTerminate(){
        return this.wsClientService.sendTerminate();
    }

    @Get('getdata')
    getData(){
        return this.wsClientService.getData();
    }
}
