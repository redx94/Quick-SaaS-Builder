/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly glob: (pattern: string) => Record<string, () => Promise<unknown>>;
  readonly hot?: {
    readonly data: Record<string, unknown>;
    accept(): void;
    dispose(cb: (data: Record<string, unknown>) => void): void;
    invalidate(): void;
  };
}

declare module 'vite/client' {
  export interface ClientHotContext {
    readonly data: Record<string, unknown>;
    accept(): void;
    dispose(cb: (data: Record<string, unknown>) => void): void;
    invalidate(): void;
  }
}