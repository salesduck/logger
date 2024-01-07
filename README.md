# Logger
Abstract logger worked on NodeJS, Browser, React-Native runtime;

## Features

1. Simple
2. Fast
3. Light weight
4. Zero dependencies
5. Easy to use
6. Work on any runtime

## Setup

1. Install logger
```
yarn add @salesduck/logger
```
2. Install format
```
yarn add @salesduck/format-logstash
```

3. Install transport
```
yarn add @salesduck/transport-console
```

## Usage

```
import { DefaultLogger } from '@salesduck/logger';
import { LogstashFormat } from '@salesduck/format-logstash';
import { ConsoleTransport } from '@salesduck/transport-console';

const transport = new ConsoleTransport({ formatter: new LogstashFormat() });
const logger = new DefaultLogger({ transports: [transport] });

logger.info({ message: 'Hello world' });
```

## TODO:
1. Log Rotation
