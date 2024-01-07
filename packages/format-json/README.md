## Format JSON

Converts log data into JSON format;

## Setup

Install package

```bash
yarn add @salesduck/format-json
```

## Usage

Just create and pass to transport

```ts
import { ConsoleTransport } from '@salesduck/transport-console';
import { JsonFormat } from '@salesduck/format-json';

const formatter = new JsonFormat();

const transport = new ConsoleTransport({ formatter });
```
