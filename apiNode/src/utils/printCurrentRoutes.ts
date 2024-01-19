/*
import {Colors, Options, Layer, ExpressApp, Stack} from '@/types/printRoute.type';
import path from 'path';
import {typeof Application} from "express";

const defaultOptions: Options = {
  prefix: '',
  spacer: 7,
  logger: console.info,
  color: true,
};

const COLORS: Colors = {
  yellow: 33,
  green: 32,
  blue: 34,
  red: 31,
  grey: 90,
  magenta: 35,
  clear: 39,
};

const spacer = (x: number): string =>
  x > 0 ? [...new Array(x)].map(() => ' ').join('') : '';
const colorText = (color: number, string: string): string =>
  `\u001b[${color}m${string}\u001b[${COLORS.clear}m`;

function colorMethod(method: string): string {
  switch (method) {
    case 'POST':
      return colorText(COLORS.yellow, method);
    case 'GET':
      return colorText(COLORS.green, method);
    case 'PUT':
      return colorText(COLORS.blue, method);
    case 'DELETE':
      return colorText(COLORS.red, method);
    case 'PATCH':
      return colorText(COLORS.grey, method);
    default:
      return method;
  }
}

function getPathFromRegex(regexp: RegExp): string {
  return regexp
    .toString()
    .replace('/^', '')
    .replace('?(?=\\/|$)/i', '')
    .replace(/\\\//g, '/')
    .replace('(?:/(?=$))', '');
}

function combineStacks(
  acc: any,
  stack: { handle: { stack: any[] }; regexp: RegExp }
) {
  if (stack.handle.stack) {
    const routerPath = getPathFromRegex(stack.regexp);
    return [
      ...acc,
      ...stack.handle.stack.map((stack) => ({ routerPath, ...stack })),
    ];
  }
  return [...acc, stack];
}

function getStacks(app: ExpressApp): Stack[] {

  // Express 5
  if (app.router && app.router.stack) {
    return app.router.stack.reduce(combineStacks, []);
  }

  return [];
}

function expressListRoutes(
  app: ExpressApp,
  opts?: Options
): Array<{ method: string; path: string }> {
  const stacks = getStacks(app);
  const {
    color,
    logger,
    prefix,
    spacer: newSpacer,
  } = { ...defaultOptions, ...opts };
  const paths = [];

  if (stacks) {
    for (const stack of stacks) {
      if (stack.route) {
        const routeLogged: { [index: string]: any } = {};
        for (const route of stack.route.stack) {
          const method = route.method ? route.method.toUpperCase() : null;
          if (!routeLogged[method] && method) {
            const stackMethod = color ? colorMethod(method) : method;
            let stackSpace = defaultOptions.spacer;
            if (newSpacer) {
              stackSpace = Number(spacer(newSpacer - method.length));
            }

            const stackPath = path
              .normalize(
                [prefix, stack.routerPath, stack.route.path, route.path]
                  .filter((s) => !!s)
                  .join('')
              )
              .trim();
            if (logger) {
              logger(stackMethod, String(stackSpace), stackPath);
            }
            paths.push({ method, path: stackPath });
            routeLogged[method] = true;
          }
        }
      }
    }
  }

  return paths;
}
*/
