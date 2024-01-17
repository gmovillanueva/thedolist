import {
  type ContextTarget,
  type DefaultDecoratorArgs,
  type DescriptorFn,
  type GeneratedDecorator,
} from '@/types/decorators.type';

import winLogger from '@/lib/loggerWinston';

export function createDecorator<
  TFnArgs,
  TArgs extends DefaultDecoratorArgs = DefaultDecoratorArgs,
  TReturn = void,
>(
  descriptorFn: DescriptorFn<TFnArgs, TReturn>,
  descriptorArgs: TFnArgs
): GeneratedDecorator<unknown, TArgs> {
  return function (_target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      winLogger.info(`Executing decorator before method: ${key}`);
      descriptorFn(descriptorArgs);
      winLogger.info('Decorator executed');
      return originalMethod ? originalMethod.apply(this, args) : null;
    };
    return descriptor;
  };
}

export function createContextDecorator<
  This,
  TReturn,
  TFnArgs,
  TArgs extends DefaultDecoratorArgs = DefaultDecoratorArgs,
>(
  context: ClassMethodDecoratorContext<This, ContextTarget<This, TReturn>>,
  _target: ContextTarget<This, TReturn>,
  descriptorFn: DescriptorFn<TFnArgs, TReturn>,
  descriptorArgs: TFnArgs
): GeneratedDecorator<ContextTarget<This, TReturn>, TArgs> {
  const methodName = String(context.name);
  winLogger.info(`Executing decorator for ${methodName}`);
  return function (_target, _key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      descriptorFn(descriptorArgs);
      return originalMethod ? originalMethod.apply(this, args) : null;
    };
    return descriptor;
  };
}
