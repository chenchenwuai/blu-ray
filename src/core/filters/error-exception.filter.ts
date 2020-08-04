import {ArgumentsHost,Catch,ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import { Logger } from "../../common/utils/logger";
import { isProd } from 'src/config';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception:any, host: ArgumentsHost):void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    Logger.error('Exception:',JSON.stringify(exception))

    let message = exception.message || 'Unknown Error'
    let isDeepestMessage = false
    while(!isDeepestMessage){
      isDeepestMessage = !message.message
      message = isDeepestMessage ? message : message.message
    }

    const status = exception.getStatus && exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR

    const errorResponse = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    }

    if(exception instanceof HttpException){
      Logger.error(
        `Catch HTTP Exception at ${request.method} ${request.url} ${status} : ${JSON.stringify(errorResponse)}`
      )
    }else{
      errorResponse.status =  HttpStatus.INTERNAL_SERVER_ERROR
      errorResponse.message = 'Server Error:'+message
      // 特殊处理
      if(isProd){ 
        Logger.error(
          `Catch Error Exception at ${request.method} ${request.url} ${status} : ${JSON.stringify(errorResponse)}`
        )
      }
    }
    
    response.status(status).json(errorResponse);
  }
}
