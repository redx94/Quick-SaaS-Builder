/// <reference types="react" />
/// <reference types="vite/client" />

declare module '@radix-ui/react-slot';
declare module 'class-variance-authority';
declare module 'tailwind-merge';
declare module 'clsx';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}