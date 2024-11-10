/// <reference types="vite/client" />

declare module 'vite/client' {
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
    readonly glob: {
      (pattern: string): Record<string, () => Promise<unknown>>;
      (pattern: string, options: { eager: true }): Record<string, unknown>;
    };
    readonly hot: {
      readonly data: Record<string, unknown>;
      accept(): void;
      accept(cb: (mod: unknown) => void): void;
      accept(dep: string, cb: (mod: unknown) => void): void;
      accept(deps: readonly string[], cb: (mods: unknown[]) => void): void;
      dispose(cb: (data: Record<string, unknown>) => void): void;
      decline(): void;
      invalidate(): void;
      on(event: string, cb: (...args: unknown[]) => void): void;
    };
  }

  interface ViteHotContext {
    readonly data: Record<string, unknown>;
    accept(): void;
    dispose(cb: (data: Record<string, unknown>) => void): void;
    invalidate(): void;
    on(event: string, cb: (...args: unknown[]) => void): void;
  }
}