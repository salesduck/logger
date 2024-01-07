# Transport Console

Allows you to send log data to standard output

## Setup

Install package

```bash
yarn add @salesduck/transport-console
```

## Usage

Just create and pass to logger

```ts
import { ConsoleTransport } from '@salesduck/transport-console';
import { DefaultLogger } from '@salesduck/logger';

const transport = new ConsoleTransport();

const logger = new DefaultLogger({ transports: [transport] });
```
