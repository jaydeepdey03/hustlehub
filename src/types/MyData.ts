export interface User {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; // You can replace `any` with a more specific type if needed
    $updatedAt: string;
    email: string;
    id: string;
    linkedinLink: string | null;
    name: string;
    role: string;
    twitterLink: string | null;
}

export interface StartupInterface {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    cofounder: string;
    founder: string;
    idea: string;
    image: string;
    milestones: string[]; // Specify the appropriate type for milestones
    title: string;
}

export interface HackathonInterface {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    creator: string;
    idea: string;
    image: string;
    link: string;
    members: string[];
    noOfMembers: number;
    title: string;
}

export interface User {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; // You can replace `any` with a more specific type if needed
    $updatedAt: string;
    email: string;
    id: string;
    linkedinLink: string | null;
    name: string;
    role: string;
    twitterLink: string | null;
}


export interface AuthUser {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    email: string;
    emailVerification: boolean;
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: unknown;
    registration: string;
    status: boolean;
}
    