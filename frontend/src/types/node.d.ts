/// <reference types="node" />

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_API_URL: string;
    VITE_APP_NAME: string;
    VITE_APP_DESCRIPTION: string;
    [key: string]: string | undefined;
  }

  interface Global {
    process: Process;
  }
}

declare module 'node:*' {
  const nodeModule: any;
  export = nodeModule;
}

declare module 'node' {
  export * from 'node:*';
}

declare module '@types/node' {
  export * from 'node';
}

declare module 'vite/client' {
  interface ImportMetaEnv extends NodeJS.ProcessEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_DESCRIPTION: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}