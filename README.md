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
```bash
yarn add @salesduck/logger
```
2. Install format
```bash
yarn add @salesduck/format-logstash
```

3. Install transport
```bash
yarn add @salesduck/transport-console
```

## Usage

```ts
import { DefaultLogger } from '@salesduck/logger';
import { LogstashFormat } from '@salesduck/format-logstash';
import { ConsoleTransport } from '@salesduck/transport-console';

const transport = new ConsoleTransport({ formatter: new LogstashFormat() });
const logger = new DefaultLogger({ transports: [transport] });

logger.info({ message: 'Hello world' });
```

If we need add more context to log, you can pass it in method

```ts
logger.info({ message: 'Hello world', error: err.stack, user: req.user.id });
// ~> { message: 'Hello world', error: 'some err stack', user: 'some user id' };
```

If we need add some information to each log, you can specify it by method `meta`

```ts
logger.meta({ application: 'name', version: '1.0.0' });

logger.info({ message: 'Hello world' });
// ~> { message: 'Hello world', 'application': 'name', version: '1.0.0' }
```

## Development

1. Make change in package
2. Rebuild it
3. Make change in another package and rebuild it
4. Increase version
```bash
yarn lerna version --no-private
```

5. Publish packages

```bash
yarn lerna publish
```

## TODO:
1. Log Rotation
2. Add format combinations
