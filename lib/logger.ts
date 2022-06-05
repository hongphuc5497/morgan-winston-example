import winston from 'winston';

// Define severity levels
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

// Set current severity level based on environment
const level = () => {
	const env = process.env.NODE_ENV || 'development';

	return env === 'development' ? 'debug' : 'warn';
};

// Define different colors for each severity level
const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};

// Link colors to severity levels
winston.addColors(colors);

// Format log messages
const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

// Define which transports to use
const transports = [
	new winston.transports.Console(),
	new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
	new winston.transports.File({ filename: 'logs/combined.log' }),
];

// Create logger instance
const Logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
});

export default Logger;
