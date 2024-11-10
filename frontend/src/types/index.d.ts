/// <reference path="./node.d.ts" />
/// <reference path="./react.d.ts" />
/// <reference path="./vite-client.d.ts" />
/// <reference path="./environment.d.ts" />
/// <reference path="./global.d.ts" />

declare module '@radix-ui/react-slot';
declare module 'class-variance-authority';
declare module 'tailwind-merge';
declare module 'clsx';

declare module 'react-dom' {
  export * from '@types/react-dom';
}

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly SSR: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly hot?: {
      readonly data: any;
      accept(): void;
      accept(cb: (mod: any) => void): void;
      accept(dep: string, cb: (mod: any) => void): void;
      accept(deps: string[], cb: (mods: any[]) => void): void;
      prune(cb: () => void): void;
      dispose(cb: (data: any) => void): void;
      decline(): void;
      invalidate(): void;
      on(event: string, cb: (...args: any[]) => void): void;
    };
    readonly glob: (
      pattern: string,
      options?: {
        as?: string;
        eager?: boolean;
        import?: string;
        query?: Record<string, string>;
      }
    ) => Record<string, () => Promise<any>>;
  }
}