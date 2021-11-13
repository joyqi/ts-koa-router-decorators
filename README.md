# ts-koa-router-decorators
Koa router decorators for TypeScript

## Installation

```
npm i ts-koa-router-decorators
```

You need to install `koa` and `koa-router` before.

```
npm i koa koa-router
```

## Example

```typescript
import Koa, { Context } from 'koa';
import {controller, get, route} from 'ts-koa-router-decorators';

@controller()
class Test {
    @get('/')
    test(ctx: Context) {
        ctx.body = 'Hello world!';
    }
}

const app = new Koa();
route(app);

app.listen(8000, () => {
    console.log('http serving...');
});
```

## API

### Decorators

* `@controller(prefix: string)`, prefix default value is `''`
* Http methods
  * `@get(path: string, ...middlewares: IMiddleware[])` GET method
  * `@post(path: string, ...middlewares: IMiddleware[])` POST method
  * `@put(path: string, ...middlewares: IMiddleware[])` PUT method
  * `@del(path: string, ...middlewares: IMiddleware[])` DELETE method
  * `@patch(path: string, ...middlewares: IMiddleware[])` PATCH method
  * `@options(path: string, ...middlewares: IMiddleware[])` OPTIONS method
  * `@head(path: string, ...middlewares: IMiddleware[])` HEAD method
  * `@all(path: string, ...middlewares: IMiddleware[])` All methods
  * `@any(path: string, ...middlewares: IMiddleware[])` Alias to `all`

### Functions

```
route(app: Koa)
```

Perform router register, this action will create all insntaces of controllers automatically.