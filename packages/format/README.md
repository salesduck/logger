# Format

Abstraction for representing log data in a specific format

## Setup

Install package

```bash
yarn add @salesduck/format
```

## Usage

You can develop a new format

You just need to create a new field where you can save the formatted
data that will be transferred to the transport

```ts
import { LogMessage, FormatterLogMessage, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export class MyFormat extends Formatter {
    format(log: LogMessage): FormatterLogMessage {
        return {
            ...log,
            [MESSAGE]: log.message.toUpperCase()
        };
    }
}
```

You can specify log type

```ts
type MyLog = { orderId?: string }

export class MyFormat extends Formatter {
    format(log: LogMessage<MyLog>): FormatterLogMessage {
        return {
            ...log,
            [MESSAGE]: log.message.toUpperCase() + log.orderId
        };
    }
}
```
