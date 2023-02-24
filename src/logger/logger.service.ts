import { Injectable, Logger, LogLevel, Inject } from '@nestjs/common';
import 'dotenv/config';

import { Stream } from 'stream';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';

type LogType = 'LOG' | 'ERROR' | 'WARN' | 'DEBUG' | 'VERBOSE';

@Injectable()
export class AppLogger extends Logger {
  private applyingLogLevel: LogLevel[];
  private logfileStream: WriteStream;

  constructor(...args) {
    console.log('CREATE_LOGGER');
    super(args[0], args[1]);

    const avaliableLogLevels: LogLevel[] = [
      'log',
      'error',
      'warn',
      'debug',
      'verbose',
    ];

    let logLevel: number = +process.env.LOG_LEVEL;
    console.log(typeof logLevel, logLevel);

    if (typeof logLevel !== 'number' || logLevel < 0 || logLevel > 4) {
      logLevel = 2;
    }
    this.applyingLogLevel = avaliableLogLevels.slice(0, logLevel + 1);

    if (!existsSync('./logs')) {
      mkdirSync('./logs');
    }
    this.logfileStream = createWriteStream(
      './logs/log' + new Date().toISOString() + '.log',
      { flags: 'a' },
    );

    console.log(this.logfileStream.path);

    this.logfileStream.write('hi');

    //TODO: Get the last log file
  }

  //TODO: Add file logger

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('log')) {
      Logger.attachBuffer();
      console.log('LOG_LOGGER');
      super.log(message, ...optionalParams);
      console.log(Logger.logBuffer);
      this.writeMessageToFile(
        'LOG',
        Logger.getTimestamp(),
        Logger.logBuffer[0].arguments,
      );
      Logger.flush();
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('error')) {
      Logger.attachBuffer();

      console.log('ERROR_LOGGER');
      super.error(message, ...optionalParams);

      this.writeMessageToFile(
        'ERROR',
        Logger.getTimestamp(),
        Logger.logBuffer[0].arguments,
      );
      Logger.flush();
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('warn')) {
      Logger.attachBuffer();

      console.log('WARN_LOGGER');
      super.warn(message, ...optionalParams);
    }

    this.writeMessageToFile(
      'WARN',
      Logger.getTimestamp(),
      Logger.logBuffer[0].arguments,
    );
    Logger.flush();
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('debug')) {
      Logger.attachBuffer();

      console.log('DEBUG_LOGGER');
      super.debug(message, ...optionalParams);
    }

    this.writeMessageToFile(
      'DEBUG',
      Logger.getTimestamp(),
      Logger.logBuffer[0].arguments,
    );
    Logger.flush();
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('verbose')) {
      Logger.attachBuffer();

      console.log('VERBOSE_LOGGER');
      super.verbose(message, ...optionalParams);

      this.writeMessageToFile(
        'VERBOSE',
        Logger.getTimestamp(),
        Logger.logBuffer[0].arguments,
      );
      Logger.flush();
    }
  }

  private writeMessageToFile(
    logType: LogType,
    timestamp: string,
    messages: unknown[],
  ): void {
    const context = messages.pop();

    messages.forEach((message) => {
      const log = `${timestamp} ${logType} [${context}] ${message}`;
      console.log(log);
    });
  }
}
