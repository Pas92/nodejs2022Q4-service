import { Injectable, Logger, LogLevel, Inject } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class AppLogger extends Logger {
  private applyingLogLevel: LogLevel[];

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

    //TODO: Get the last log file
  }

  //TODO: Add file logger

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('log')) {
      console.log('LOG_LOGGER');
      super.log(message, ...optionalParams);
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('error')) {
      console.log('ERROR_LOGGER');
      super.error(message, ...optionalParams);
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('warn')) {
      console.log('WARN_LOGGER');
      super.warn(message, ...optionalParams);
    }
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('debug')) {
      console.log('DEBUG_LOGGER');
      super.debug(message, ...optionalParams);
    }
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    if (this.applyingLogLevel.includes('verbose')) {
      console.log('VERBOSE_LOGGER');
      super.verbose(message, ...optionalParams);
    }
  }
}
