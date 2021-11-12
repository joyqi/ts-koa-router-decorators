import Koa, { Context } from "koa";
import {all, controller, route} from "./decorators";

@controller('/')
class Test {

    @all('/')
    test(ctx: Context) {
        ctx.body = 'hello world';
    }
}

const app = new Koa();
route(app);

app.listen(8000, () => {
    console.log('hello');
});