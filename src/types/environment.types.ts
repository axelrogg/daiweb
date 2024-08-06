type EnvironmentVariables = {
    CLERK_WEBHOOK_SECRET: string;
    CLERK_SECRET_KEY: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
    //SUPABASE_URL: string;
    //SUPABASE_ANON_KEY: string;
    DATABASE_CONNECTION_STR: string;
};

type EnvironmentSecrets = {
    pub: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
    };
    server: {
        CLERK_WEBHOOK_SECRET: string;
        CLERK_SECRET_KEY: string;
        //SUPABASE_URL: string;
        //SUPABASE_ANON_KEY: string;
        DATABASE_CONNECTION_STR: string;
    };
};

export type { EnvironmentSecrets, EnvironmentVariables };
