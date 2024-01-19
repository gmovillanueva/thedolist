export interface Options {
  spacer?: number;
  prefix?: string;
  logger?: (method: string, space: string, path: string) => void;
  color?: boolean;
}

export interface Colors {
  yellow: number;
  green: number;
  blue: number;
  red: number;
  grey: number;
  magenta: number;
  clear: number;
}

export interface Layer {
  name: string;
  route?: Route;
}

export interface ExpressApp {
  // Express 3
  routes?: Record<string, Route[][]>;
  // Express 4
  _router?: { stack: Layer[] };
  // Express 4, 5 Router
  stack?: Layer[];
  // Express 5
  router?: { stack: Layer[] } | string;
}

export interface Stack {
  handle: {
    stack: Stack[];
  };
  regexp: RegExp;
}

export interface Route {
  method?: string | object;
  path?: string;
}

export interface RouteStack {
  route: Route;
}
