export interface GoogleOAuthDto {
    idToken: string;
    id: string;
    name: string;
    email: string;
    password?: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    provider: string;
    acceptLegalPolicy?: boolean;
    newUser?: boolean;
    rememberMe?: boolean; // Added rememberMe property
}