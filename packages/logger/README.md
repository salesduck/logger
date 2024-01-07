# Logger

Implements a logger that allows you to record messages at various levels

## Setup

Install package

```bash
yarn add @salesduck/logger
```

## Usage

You can develop new logger with custom levels

```ts
import { Logger } from '@salesduck/logger';

enum MyLevels = {
    CRITICAL,
    FATAL
};

class MyLogger extends Logger {
    critical(log: Log): void {
        return this.log({ name: 'critical', priority: MyLevels.CRITICAL }, log);
    }

    fatal(log: Log): void {
        return this.log({ name: 'fatal', priority: MyLevels.FATAL }, log);
    }
}
```

Or extends existing

```ts
import { DefaultLogger } from '@salesduck/logger';

class MyLogger extends DefaultLogger {
    warning(log: Log): void {
        return this.log({ name: 'fatal', priority: 1 }, log);
    }
}
```
