interface Config {
    googleClientId : string;
    googleClientSecret : string;
    apiBaseUrl : string;
    endPoint : string;
    accessKeyId : string;
    secretAccessKey : string;
}

export const config : Config = {
    googleClientId : process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET || "",
    apiBaseUrl : process.env.NEXT_PUBLIC_API_BASE_URL || "",
    endPoint : process.env.SPACE_ENDPOINT || "",
    accessKeyId : process.env.SPACE_ACCESS_KEY_ID || "",
    secretAccessKey : process.env.SPACE_SECRET_ACCESS_KEY || "",
}