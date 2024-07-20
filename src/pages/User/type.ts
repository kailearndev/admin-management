export interface UserType {
    id: string
    firstName: string
    lastName: string
    gender: number
    dateOfBirth: string
    email: string
    phone: string
    profilePicture?: string
    altProfilePicture?: string
    urlProfilePicture?: string
    helloPicture?: string
    altHelloPicture?: string
    urlHelloPicture?: string
    bio?: string
    occupation: string
    address: string
    nationality: string
    facebookUrl?: string
    instagramUrl?: string
    twitterUrl?: string
    skills: Skill[]
    interests?: Interest[]
    createdDate?: string
    updatedDate?: string
    ownerId?: string
}

interface Skill {
    name: string
    star: number
    order: number
}

interface Interest {
    name: string
    order: number
}
export const userState: UserType = {
    id: "",
    firstName: "",
    lastName: "",
    gender: 0,
    dateOfBirth: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    nationality: "",
    skills: []
}
export interface UserUpdateType {
    id: string
    firstName: string
    lastName: string
    gender: number
    dateOfBirth: string
    email: string
    phone: string
    profilePicture: string
    altProfilePicture: string
    helloPicture: string
    altHelloPicture: string
    bio: string
    address: string
    nationality: string
    facebookUrl: string
    instagramUrl: string
    twitterUrl: string
    skills: Skill[]
    interests: Interest[]
}