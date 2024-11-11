/// <reference types="react" />

declare module 'react-dom' {
  import * as React from 'react';

  export function createPortal(
    children: React.ReactNode,
    container: Element | DocumentFragment,
    key?: null | string
  ): React.ReactPortal;

  export function flushSync<R>(fn: () => R): R;

  export function hydrate(
    element: React.ReactElement,
    container: Element | DocumentFragment,
    callback?: () => void
  ): void;

  export function render(
    element: React.ReactElement,
    container: Element | DocumentFragment,
    callback?: () => void
  ): void;

  export function unmountComponentAtNode(container: Element | DocumentFragment): boolean;

  export const version: string;

  export function unstable_batchedUpdates<A, R>(callback: (a: A) => R, a: A): R;
  export function unstable_batchedUpdates<R>(callback: () => R): R;

  export function unstable_renderSubtreeIntoContainer<T extends Element>(
    parentComponent: React.Component<any>,
    element: React.ReactElement,
    container: T,
    callback?: () => void
  ): T;

  export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: any[];
    ReactBrowserEventEmitter: {
      isEnabled: () => boolean;
    };
  };

  export interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }

  export function createRoot(
    container: Element | DocumentFragment,
    options?: { hydrate?: boolean }
  ): Root;
}