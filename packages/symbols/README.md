## Symbols

The package stores common types and symbols

## Setup

Install package

```bash
yarn add @salesduck/symbols
```

## Usage

```ts
import { MESSAGE, LEVEL, LogLevel } from '@salesduck/symbols';

const level: LogLevel = {
    name: 'info',
    priority: 2
};

const log: FormatterLog = {
    [LEVEL]: LogLevel.INFO,
    [MESSAGE]: 'Hello World!'
};
```
