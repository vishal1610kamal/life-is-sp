import { ILoggerConfig } from 'src/domain/config/logger-config.interface';

export class LoggerConfig implements ILoggerConfig {
  filename: string;
  datePattern: string;
  maxFiles: string;
  logFile: string;
  level: string;
  filenameCombined: string;

  constructor() {
    this.filename = process.env.FILENAME;
    this.datePattern = process.env.DATA_PATTERN;
    this.maxFiles = process.env.MAX_FILES;
    this.logFile = process.env.LOG_FILE;
    this.level = process.env.LEVEL;
    this.filenameCombined = process.env.FILENAME_COMBINED;
  }
}
