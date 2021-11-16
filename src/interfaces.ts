interface iLocation {
    __typename: string;
    name: string;
}

interface iInfo {
    pages: number;
}

export interface iUser {
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    id: string;
    location: iLocation
  }

export interface iCharacters {
    info: iInfo;
    results: iUser[];
}