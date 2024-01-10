# Format Simple

Convert log data into simple console message

## Setup

Install package

```bash
yarn add @salesduck/format-simple
```

## Usage

Just create and pass to transport

```ts
import { ConsoleTransport } from '@salesduck/transport-console';
import { SimpleFormat } from '@salesduck/format-simple';

const formatter = new SimpleFormat();

const transport = new ConsoleTransport({ formatter });
```
