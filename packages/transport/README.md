## Transport

Abstraction for sending log data to consumers

## Setup

Install package

```bash
yarn add @salesduck/transport-logs
```

## Usage

You can develop a new transport

Any transport must implement the method `log`, which will send the field `MESSAGE` to the consumer

```ts
import { FormatterLog, MESSAGE } from '@salesduck/symbols-logs';
import { Transport } from '@salesduck/transport-logs';

export class MyTransport extends Transport {
    log(message: FormatterLog): void {
        // NOTE: Abstract native sdk, for example Android
        NativeSDK.captureLog(message[MESSAGE]);
    }
}
```
