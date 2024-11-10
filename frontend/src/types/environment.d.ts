/// <reference types="vite/client" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'node' {
  export = NodeJS;
}

declare module 'react' {
  export = React;
}

declare module 'react-dom' {
  export = ReactDOM;
}

declare module 'vite/client' {
  export interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_DESCRIPTION: string;
  }

  export interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module '@radix-ui/react-slot';
declare module 'class-variance-authority';
declare module 'tailwind-merge';
declare module 'clsx';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_API_URL: string;
    VITE_APP_NAME: string;
    VITE_APP_DESCRIPTION: string;
  }
}