import * as winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // log 출력 포맷 정의
});

const options = {
  // log파일
  file: {
    level: 'info',
    filename: `logs/winston-test.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'winston-test' }),
      timestamp(),
      myFormat, // log 출력 포맷
    ),
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(label({ label: 'test' }), timestamp(), myFormat),
  },
};

const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file), // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false,
});

export const stream = {
  write: function(message: string) {
    logger.info(message); // 단순히 message를 default 포맷으로 출력
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console)); // 개발 시 console로도 출력
}

export default logger;
