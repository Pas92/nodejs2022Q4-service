import {
  Injectable,
  Logger,
  LoggerService,
  ConsoleLogger,
} from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
  constructor(...args) {
    console.log('CREATE_LOGGER');
    //TODO: Get the last log file
    super(args[0], args[1]);
  }

  //TODO: Add file logger

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log('LOG_LOGGER');
    super.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.log('ERROR_LOGGER');
    super.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log('WARN_LOGGER');
    super.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    console.log('DEBUG_LOGGER');
    super.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    console.log('VERBOSE_LOGGER');
    super.verbose(message, ...optionalParams);
  }
}
