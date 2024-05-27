/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
    export type RegisterSWOptions = {
        immediate?: boolean;
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
        onRegistered?: (
            registration: ServiceWorkerRegistration | undefined
        ) => void;
        onRegisterError?: (error: Error) => void; // Specify the type as Error
    };

    export function registerSW(
        options?: RegisterSWOptions
    ): (reloadPage?: boolean) => Promise<void>;
}
