export interface GoogleOAuthDto {
    idToken: string;
    id: string;
    name: string;
    email: string;
    pasword? : string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    provider: string;
    acceptLegalPolicy? : boolean;
    newUser? : boolean;
}