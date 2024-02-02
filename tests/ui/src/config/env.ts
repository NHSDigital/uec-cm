import dotenv from "dotenv"

export function getEnv() {
    try {
        if (process.env.test_env) {
            dotenv.config({
                path: `src/config/.env.${process.env.test_env}`,
                override: true
            });
        }
    } catch (error) {
        console.error("Error loading environment variables:", error);
    }
}

