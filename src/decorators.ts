import Router, { IMiddleware } from "koa-router";
import Koa from 'koa';

type Method = 'put' | 'get' | 'post' | 'delete' | 'path' | 'options' | 'head' | 'patch';

type MethodHandler = (path: string, ...middlewares: IMiddleware[]) => any;

type Route = [Method[], string, Function, IMiddleware[]];

type RouterController = [Router, any];

const routerControllers: RouterController[] = [];

export function controller(prefix: string) {
    return <T extends { new (...args: any[]): {} }>(Controller: T) => {
        const router = new Router({ prefix });
        
        const controller = class extends Controller {
            constructor(...args: any[]) {
                super(...args); 

                const routes: Route[] = Controller.prototype.routes;

                if (routes) {
                    for (const route of routes) {
                        const [methods, path, handler, middlewares] = route;
                        middlewares.push(handler.bind(this));

                        router.register(path, methods, middlewares);
                    }
                }
            }
        };

        routerControllers.push([router, controller]);
    };
}

export function route(app: Koa) {
    for (const [router, controller] of routerControllers) {
        new controller();
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}

function register(methods: Method[]): MethodHandler {
    return (path: string, ...middlewares: IMiddleware[]) => {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            target.routes = target.routes || [];
            target.routes.push([methods, path, descriptor.value, middlewares]);
        }
    };
}

export const put = register(['put']);
export const get = register(['get']);
export const post = register(['post']);
export const del = register(['delete']);
export const patch = register(['patch']);
export const options = register(['options']);
export const head = register(['head']);
export const any = register(['put', 'get', 'post', 'delete', 'path', 'options', 'head', 'patch']);
export const all = register(['put', 'get', 'post', 'delete', 'path', 'options', 'head', 'patch']);