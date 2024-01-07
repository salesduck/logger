import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { ConsoleTransport } from '@salesduck/transport-console';
import { LogStashFormat } from '@salesduck/format-logstash';
import { FetchTransport } from '@salesduck/transport-fetch';
import { DefaultLogger } from '@salesduck/logger';

function App() {
    // FIXME: по какой-то причине App вызывается два раза, поэтому
    // сообщение показывается тоже два раза

    // NOTE: send log by console
    useEffect(() => {
        const formatter = new LogStashFormat();
        const transport = new ConsoleTransport({ formatter });
        const logger = new DefaultLogger({ transports: [transport] });

        logger.info({ message: 'Hello world' });
    }, []);

    // NOTE: send log by fetch
    useEffect(() => {
        const formatter = new LogStashFormat();

        const transport = new FetchTransport({
            formatter,
            url: '/log/push',
            init: { headers: { Authorization: 'my token' } },
            onError: console.log
        });

        const logger = new DefaultLogger({ transports: [transport] });

        logger.info({ message: 'Hello fetch' });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
