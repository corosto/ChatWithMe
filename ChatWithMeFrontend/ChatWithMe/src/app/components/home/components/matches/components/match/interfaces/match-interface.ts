import { LookingForText } from '@components/landing-page/register/components/looking-for-dialog/constants/looking-for-options.const';

export interface Match {
  id?: number,
  name: string,
  age: string,
  city: string,
  distance?: string,
  images: string[],
  description: string,
  height: string,
  weight: string,
  zodiac: string,
  education: string,
  kids: string,
  pets: string,
  alcohol: string,
  smoking: string,
  gym: string,
  diet: string,
  lookingFor: LookingForText,
  school: string,
  job: string,
  position: string,
  interests: string[],
  sex: 'female' | 'male' | 'other',
  sexualOrientations: string[],

  showLikesDialog?: 'Like' | 'SuperLike',
}
