import React from "react";
import { unstable_batchedUpdates } from "react-dom";

type ListenerFn<T> = (value: T) => void;

type WritableReturn<T> = [() => T, (fn: (previous: T) => T) => void];

export function writable<T extends object>(value: T): WritableReturn<T> {
  let current: T = value;

  const subscriptions = new Set<ListenerFn<T>>();

  const notify = (updated: T) => {
    unstable_batchedUpdates(() => {
      subscriptions.forEach((sub) => sub(updated));
    });
  };

  const writeNext = (fn: (previous: T) => T) => {
    current = fn(current);
    notify(current);
  };

  const subscribe = (cb: ListenerFn<T>) => {
    subscriptions.add(cb);
    return () => void subscriptions.delete(cb);
  };

  const useWritable = (): T => {
    const [, forceUpdate] = React.useReducer((c) => c + 1, [0]);
    const isMountedRef = React.useRef(false);
    const prevValueRef = React.useRef(current);

    React.useEffect(() => {
      const unsubscribe = subscribe((currentValue: T) => {
        if (!Object.is(currentValue, prevValueRef.current) && isMountedRef) {
          prevValueRef.current = currentValue;
          forceUpdate();
        }
      });
      return unsubscribe;
    }, []);

    React.useEffect(() => {
      isMountedRef.current = true;
    }, []);

    return current;
  };

  // Cases where we need to use outside react.
  writable.prototype.subscribe = subscribe;
  writable.prototype.value = Object.freeze(current);

  return [useWritable, writeNext];
}
