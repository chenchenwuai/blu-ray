import Chalk = require('chalk')                                               
Chalk.level = 3 
import * as _ from 'lodash'
import Log4js = require('log4js')
import * as Moment from 'moment'
import * as Path from 'path'
import * as StackTrace from 'stacktrace-js'
import * as Util from 'util'

import { isProd } from '../../config'

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK', 
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

Log4js.addLayout('nestjs', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = ''
    let position = ''

    const messageList: string[] = []
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`
        }
        return
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true)
      }

      messageList.push(value)
    })

    const messageOutput: string = messageList.join(' ')
    const positionOutput: string = position ? ` [${position}]` : ''
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()} - `
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] '
    let levelOutput = `[${logEvent.level}] ${messageOutput}`

    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput)
        break
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput)
        break
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput)
        break
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput)
        break
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput)
        break
      default:
        levelOutput = Chalk.grey(levelOutput)
        break
    }

    return `${Chalk.green(typeOutput)}${dateOutput}    ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`
  }
})

if (isProd) {
  Log4js.configure({
    appenders: {
      fileAppender: {
        type: 'DateFile',
        filename: './logs/prod.log',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        layout: { type: 'nestjs' },
        daysToKeep: 60,
      },
      console: {
        type: 'stdout',
        layout: { type: 'nestjs' },
        level: 'info',
      },
      logLevelFilterAppender: {
        type: 'logLevelFilter',
        appender: 'fileAppender',
        level: 'warn',
      },
    },
    pm2: true,
    disableClustering: true,
    categories: {
      default: {
        appenders: ['logLevelFilterAppender', 'console'],
        level: 'info',
      },
    },
  })
} else {
  Log4js.configure({
    appenders: {
      console: {
        type: 'stdout',
        layout: { type: 'nestjs' },
      },
    },
    categories: {
      default: {
        appenders: ['console'],
        level: 'debug',
      },
    },
  })
}

const logger = Log4js.getLogger()

export class Logger {
  static trace(...args):void {
    logger.trace(Logger.getStackTrace(), ...args)
  }

  static debug(...args):void {
    logger.debug(Logger.getStackTrace(), ...args)
  }

  static log(...args):void {
    logger.info(Logger.getStackTrace(), ...args)
  }

  static info(...args):void {
    logger.info(Logger.getStackTrace(), ...args)
  }

  static warn(...args):void {
    logger.warn(Logger.getStackTrace(), ...args)
  }

  static warning(...args):void {
    logger.warn(Logger.getStackTrace(), ...args)
  }

  static error(...args):void {
    logger.error(Logger.getStackTrace(), ...args)
  }

  static fatal(...args):void {
    logger.fatal(Logger.getStackTrace(), ...args)
  }

  static getStackTrace(deep = 2): ContextTrace {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync()
    const stackInfo: StackTrace.StackFrame = stackList[deep]

    const lineNumber: number = stackInfo.lineNumber
    const columnNumber: number = stackInfo.columnNumber
    const fileName: string = stackInfo.fileName

    const extnameLength: number = Path.extname(fileName).length
    let basename: string = Path.basename(fileName)
    basename = basename.substr(0, basename.length - extnameLength)
    const context: string = _.upperFirst(_.camelCase(basename))

    return new ContextTrace(context, fileName, lineNumber, columnNumber)
  }
}
