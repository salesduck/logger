# Transport Fetch

Allows you to send log data over the network to the consumer

## Setup

Install package

```bash
yarn add @salesduck/transport-fetch
```

## Usage

Just create and pass to logger

```ts
import { FetchTransport } from '@salesduck/transport-fetch';
import { DefaultLogger } from '@salesduck/logger';

const transport = new FetchTransport({ url: 'https://somewebsite.com' });

const logger = new DefaultLogger({ transports: [transport] });
```
