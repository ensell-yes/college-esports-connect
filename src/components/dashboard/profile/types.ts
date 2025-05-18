
// Game interface
export interface Game {
  name: string;
  color: string;
}

// Recruitment option interface
export interface RecruitmentOption {
  name: string;
  color: string;
}

// Profile data interface
export interface ProfileData {
  prefix: string;
  gamertag: string;
  firstName: string;
  lastName: string;
  headline: string;
  city: string;
  state: string;
  followers: number;
  profileImage: string;
  coverImage: string;
  showLocation: boolean;
}

// Image crop area interface
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
