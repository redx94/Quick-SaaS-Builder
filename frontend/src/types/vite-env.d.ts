/// <reference types="vite/client" />

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
}

declare module 'vite/client' {
  interface ViteHotContext {
    readonly data: any;
    accept(): void;
    dispose(cb: (data: any) => void): void;
    invalidate(): void;
  }

  export interface ViteClient {
    createHotContext(id: string): ViteHotContext;
  }
}