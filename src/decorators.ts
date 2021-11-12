import Router, { IMiddleware } from "koa-router";
import Koa from 'koa';
import Application from "koa";

type Method = (path: string, ...middlewares: Application.Middleware[]) => any

interface Methods {
    [method: string]: Method | undefined;
}

interface Routes {
    [name: string]: any[];
}

const routers: Router[] = [];
const routes: Routes = {};

export function controller(prefix: string) {
    return <T extends { new (...args: any[]): {} }>(Controller: T) => {
        return class A extends Controller {
            private static routes = [];

            constructor(...args: any[]) {
                super(...args);

                const router = new Router({
                    prefix
                });

                console.log((Controller as any).routes);

                for (const route of routes[Controller.name]) {
                    const [path, method, middlewares] = route;
                    middlewares.push(method.bind(this));

                    router.register(path, [method], middlewares);
                }

                routers.push(router);
            }
        }
    };
}

export function route(app: Koa) {
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
            (target as any).routes = [];
            (target as any).routes.push([path, descriptor.value, middlewares]);
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