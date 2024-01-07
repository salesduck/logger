var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ConsoleTransport = require('@salesduck/transport-console').ConsoleTransport;
var FetchTransport = require('@salesduck/transport-fetch').FetchTransport;
var LogStashFormat = require('@salesduck/format-logstash').LogStashFormat;
var DefaultLogger = require('@salesduck/logger').DefaultLogger;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// NOTE: send log by console
(function () {
    const formatter = new LogStashFormat();
    const transport = new ConsoleTransport({ formatter });
    const logger = new DefaultLogger({ transports: [transport] });

    logger.info({ message: 'Hello world' });
})();

// NOTE: send log by fetch
(function () {
    const formatter = new LogStashFormat();

    const transport = new FetchTransport({
        formatter,
        url: 'https://localhost:3000/log/push',
        init: { headers: { Authorization: 'my token' } },
        onError: console.log
    });

    const logger = new DefaultLogger({ transports: [transport] });

    logger.info({ message: 'Hello fetch' });
})();

module.exports = app;
