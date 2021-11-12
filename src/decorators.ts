import Router, { IMiddleware } from "koa-router";
import Koa from 'koa';
import Application from "koa";

type Method = (path: string, ...middlewares: Application.Middleware[]) => any

interface Methods {
    [method: string]: Method | undefined;
}

const defaultRouter: Router = new Router();
const routers: Router[] = [];
const prop = Symbol('router');

export function controller(path: string) {
    return (target: Function) => {
        const router = new Router({
            prefix: path
        });

        target.prototype[prop] = router;
        routers.push(router);
    };
}

export function route(app: Koa) {
    if (defaultRouter.routes().length > 0) {
        routers.unshift(defaultRouter);
    }

    for (const router of routers) {
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}

export const methods: Methods = {
    put: undefined,
    get: undefined,
    post: undefined,
    delete: undefined,
    patch: undefined,
    all: undefined,
    options: undefined,
    head: undefined
};

function register(method: string): Method {
    return (path: string, ...middlewares: IMiddleware[]) => {
        return (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {
            const router: Router = target.prototype[prop] || defaultRouter;
            middlewares.push(descriptor.value);

            router.register(path, [method], middlewares);
        }
    };
}

export const put = register('put');
export const get = register('get');
export const post = register('post');
export const del = register('delete');
export const patch = register('patch');
export const all = register('all');
export const any = register('all');
export const options = register('options');
export const head = register('head');