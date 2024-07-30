export interface EducationResponse {
    id: string
    bio: string
    description: string
    educations: Education[]
    experiences: Experience[]
    degrees: Degree[]
    isActive: boolean
    createdDate: string
    updatedDate: string
    ownerId: string
  }
  
  export interface Education {
    universityName: string
    universityDate: string
    universityPara: string
    order: number
  }
  
  export interface Experience {
    dates: string
    type: string
    position: string
    bullets: string
    order: number
  }
  
  export interface Degree {
    name: string
    fileId: string
    fileName?: string
    fileUrl?: string
    description?: string
    contentType?: string
    order: number
  }

  export const EducationUpdate: EducationResponse  ={
    id: "",
    bio: "",
    description: "",
    educations: [],
    experiences: [],
    degrees: [],
    isActive: false,
    createdDate: "",
    updatedDate: "",
    ownerId: ""
  }

  export interface DegreeUpdate {
    name: string
    fileId: string
   
    description?: string
    
    order: number
  }