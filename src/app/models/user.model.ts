import { Role } from "../core/enums/role.enum";

export interface User {
    idToken: string;
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    provider: string;
    acceptLegalPolicy?: boolean;
    // step two
    businessName: string;
    buisnessType: string;
    adresse: string;
    phone: string;
    companyName: string;
    // step three
    newUser?: boolean;
    role: Role
    plan : string

    // favorite sports

    favoriteSport : string;
    favoriteLeague : string
} 