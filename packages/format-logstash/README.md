# Format Logstash

Converts log data into Logstash format

## Setup

Install package

```bash
yarn add @salesduck/format-logstash
```

## Usage

Just create and pass to transport

```ts
import { ConsoleTransport } from '@salesduck/transport-console';
import { LogstashFormat } from '@salesduck/format-logstash';

const formatter = new LogstashFormat();

const transport = new ConsoleTransport({ formatter });
```
