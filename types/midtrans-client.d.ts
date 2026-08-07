declare module "midtrans-client" {
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    createTransaction(params: unknown): Promise<{
      token: string;
      redirect_url: string;
    }>;
  }

  const midtransClient: {
    Snap: typeof Snap;
  };

  export default midtransClient;
}

declare global {
  interface Window {
    snap: {
      pay(
        token: string,
        options?: {
          onSuccess?(result: unknown): void;
          onPending?(result: unknown): void;
          onError?(result: unknown): void;
          onClose?(): void;
        }
      ): void;
    };
  }
}

export {};