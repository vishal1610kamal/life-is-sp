export interface ILogger {
  // debug(context: string, message: string): void;
  // log(context: string, message: string): void;
  // error(context: string, message: string, trace?: string): void;
  // warn(context: string, message: string): void;
  // verbose(context: string, message: string): void;

  debug(message: string): void;
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  // verbose(context: string, message: string): void;
}
