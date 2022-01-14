import Koa from 'koa';
import { IMiddleware } from "koa-router";

declare namespace KoaRouterDecorators {
    export function route(app: Koa);

    export function controller(prefix?: string): Function;

    export function put(path: string, ...middlewares: IMiddleware[]): Function;
    export function get(path: string, ...middlewares: IMiddleware[]): Function;
    export function post(path: string, ...middlewares: IMiddleware[]): Function;
    export function del(path: string, ...middlewares: IMiddleware[]): Function;
    export function patch(path: string, ...middlewares: IMiddleware[]): Function;
    export function options(path: string, ...middlewares: IMiddleware[]): Function;
    export function head(path: string, ...middlewares: IMiddleware[]): Function;
    export function any(path: string, ...middlewares: IMiddleware[]): Function;
    export function all(path: string, ...middlewares: IMiddleware[]): Function;
}

export = KoaRouterDecorators;