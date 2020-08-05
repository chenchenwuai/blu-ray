import { Logger } from '../../common/utils/logger'
import { Request,Response } from "express";

export function logger(req:Request,res:Response,next:()=>void): void {

  const statusCode = res.statusCode
  const logFormat = `${req.method} ${req.originalUrl} ip: ${req.ip} statusCode: ${statusCode}`

  next()

  if (statusCode >= 500) {
    Logger.error(logFormat)
  } else if (statusCode >= 400) {
    Logger.warn(logFormat)
  } else {
    Logger.log(logFormat)
  }
  
}
