/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react' {
  export = React;
}

declare module 'react-dom' {
  export = ReactDOM;
}

declare namespace React {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  interface ForwardRefRenderFunction<T, P = {}> {
    (props: P, ref: ForwardedRef<T>): ReactElement | null;
    displayName?: string | undefined;
    defaultProps?: never | undefined;
    propTypes?: never | undefined;
  }

  interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
    new(props: P, context?: any): Component<P, S>;
    propTypes?: WeakValidationMap<P> | undefined;
    contextType?: Context<any> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    childContextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
}

declare module '@radix-ui/react-slot';
declare module 'class-variance-authority';
declare module 'tailwind-merge';
declare module 'clsx';