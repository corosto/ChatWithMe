import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Register, TokenData, UserAuthorization } from '@components/landing-page/interfaces/authentication-interface';
import { Api } from '@core/enums/api.enum';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { UserService } from '@core/services/authorization/user.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { environment } from '@env/environment';
import { City } from '@shared/components/city/city.component';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { addSeconds } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { orderBy, uniqBy } from 'lodash';
import { Observable, catchError, map, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) { }

  register(value: Register): Observable<boolean> {
    const formData = new FormData();
    formData.append('Name', value.name);
    formData.append('Email', value.email);
    formData.append('Password', value.password);
    formData.append('ConfirmedPassword', value.confirmedPassword);
    formData.append('Height', value.height);
    formData.append('Weight', value.weight);
    formData.append('BirthDate', value.birthDate.toISOString());
    formData.append('Sex', value.sex);
    formData.append('City', JSON.stringify(value.cityChosen));
    formData.append('ShowMe', value.showMe);
    formData.append('LookingFor', value.lookingFor);
    formData.append('Description', value.description ?? '');
    formData.append('Zodiac', value.zodiac ?? '');
    formData.append('Education', value.education ?? '');
    formData.append('Kids', value.kids ?? '');
    formData.append('Pets', value.pets ?? '');
    formData.append('Alcohol', value.alcohol ?? '');
    formData.append('Smoking', value.smoking ?? '');
    formData.append('Gym', value.gym ?? '');
    formData.append('Diet', value.diet ?? '');
    formData.append('School', value.school ?? '');
    formData.append('Job', value.job ?? '');
    formData.append('Position', value.position ?? '');

    value.interests.forEach((interest) => {
      formData.append('Interests', interest);
    });

    value.sexualOrientations.forEach((sexualOrientation) => {
      formData.append('SexualOrientations', sexualOrientation);
    });

    value.images.forEach((image) => {
      formData.append('Images', image);
    });

    return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.REGISTER}`, formData)
      .pipe(
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(false);
        })
      );
  }

  login(form: FormGroup): Observable<boolean> {

    const userData: { login: string, password: string, grantType: string, } = {
      ...form.value as { login: string, password: string, },
      grantType: 'password',
    };

    return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.LOGIN}`, userData)
      .pipe(
        tap((token) => this.setUserStorage(token)),
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(false);
        })
      );
  }

  logout(): Observable<unknown> {
    return this.http.post(`${environment.httpBackend}${Api.LOGOUT}`, {}).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastMessageService.notifyOfError(err.statusText);
        return of(null);
      })
    );
  }

  getCities(placeName: string): Observable<{ text: string, value: City }[]> {
    const params = new HttpParams()
      .set('country', 'PL')
      .set('placename_startsWith', placeName)
      .set('maxRows', '500')
      .set('featureClass', 'P')
      .set('username', 'corosto');

    const endpoint = `http://api.geonames.org/postalCodeSearchJSON`;
    return this.http.get<GeoNames>(endpoint, { params }).pipe(
      map((res) => res.postalCodes),
      map((res) => uniqBy(res, 'adminCode3')),
      map((res) => orderBy(res, 'placeName', 'asc')),
      map((res) => {
        return res.map((result) => {
          return {
            text: `${result?.placeName}, ${result?.adminName2}`,
            value: { Name: result?.placeName, FullPlaceName: `${result?.placeName}, ${result?.adminName2}`, Height: result?.lat, Width: result?.lng },
          };
        });
      }),
      catchError(() => of([])),
    );
  }

  private setUserStorage(token: UserAuthorization): void {
    const decodedToken: TokenData = jwt_decode(token.accessToken);

    this.userService.setUserToken(token.accessToken);

    const { exp, userId, name } = decodedToken;
    const refreshToken = token.refreshToken;

    this.localStorageService.setItem<TokenData>(KeyStorage.USER, {
      refreshToken, userId, name, expires_at: addSeconds(new Date(), exp).toISOString()
    });
  }
}

interface GeoNames {
  postalCodes: {
    adminCode1: string,
    adminCode2: string,
    adminCode3: string,
    adminName1: string,
    adminName2: string,
    adminName3: string,
    countryCode: string,
    lat: number,
    lng: number,
    placeName: string,
    postalCode: string,
  }[]
}



export const USER_0: Register = {
  name: 'Filip',
  email: 'admin@example.com',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '190',
  weight: '65',
  birthDate: new Date('2001-01-12T23:00:00.000Z'),
  sex: 'male',
  description: 'tyle roboty ze fiu fiu',
  zodiac: 'Koziorożec',
  education: null,
  kids: 'Jeszcze nie wiem',
  pets: null,
  alcohol: null,
  smoking: 'Nie palę',
  gym: null,
  diet: null,
  school: 'POSL',
  job: '',
  position: 'programator',
  cityInput: "Rudy, Powiat raciborski",
  cityChosen: {
    Name: "Rudy",
    FullPlaceName: "Rudy, Powiat raciborski",
    Height: 50.191890265496895,
    Width: 18.448735892422576
  },
  showMe: 'female',
  lookingFor: 'Czegoś na krótko lub dłużej',
  images: [
    'assets/images/MockUsersImages/0/1.jpeg',
    'assets/images/MockUsersImages/0/2.jpeg',
    'assets/images/MockUsersImages/0/3.webp',
  ],
  interests: ['Teatr', 'Freelance', 'Gra na saksofonie'],
  sexualOrientations: ['Heteroseksualna'],
};


export const USER_1: Register = {
  name: 'Kamila',
  email: 'user1@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '180',
  weight: '65',
  birthDate: new Date('2000-05-02T23:00:00.000Z'),
  sex: 'female',
  description: 'cos tam coś tam se gada',
  zodiac: 'Waga',
  education: 'Mam doktorat',
  kids: null,
  pets: 'Rybka',
  alcohol: null,
  smoking: null,
  gym: null,
  diet: null,
  school: '',
  job: '',
  position: '',
  cityInput: "Racibórz, Powiat raciborski",
  cityChosen: {
    Name: "Racibórz",
    FullPlaceName: "Racibórz, Powiat raciborski",
    Height: 50.0886680724141,
    Width: 18.22196181692808
  },
  showMe: 'female',
  lookingFor: 'Zabawy i czegoś przelotnego',
  images: [
    'assets/images/MockUsersImages/1/1.jpeg',
    'assets/images/MockUsersImages/1/2.jpeg',
  ],
  interests: ['Gorące źródła', 'K - Pop', 'Piłka nożna', 'DIY'],
  sexualOrientations: ['Gej', 'Niezdefiniowana'],
};

export const USER_2: Register = {
  name: 'Natalia',
  email: 'user2@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '55',
  birthDate: new Date('1993-12-12T23:00:00.000Z'),
  sex: 'other',
  description: 'lubie kebsy',
  zodiac: 'Ryby',
  education: 'Chodzę do liceum',
  kids: null,
  pets: null,
  alcohol: null,
  smoking: null,
  gym: 'Codziennie',
  diet: null,
  school: 'Podstwowka',
  job: '',
  position: 'piesek',
  cityInput: "Gdańsk, Gdańsk",
  cityChosen: {
    Name: "Gdańsk",
    FullPlaceName: "Gdańsk, Gdańsk",
    Height: 54.31821822930471,
    Width: 18.58963100941158
  },
  showMe: 'all',
  lookingFor: 'Nowych znajomości',
  images: [
    'assets/images/MockUsersImages/2/1.webp',
    'assets/images/MockUsersImages/2/2.webp',
    'assets/images/MockUsersImages/2/3.webp',
  ],
  interests: ['Podróże', 'Prawa OzN', 'Sci - fi'],
  sexualOrientations: ['Aseksualna'],
};

export const USER_3: Register = {
  name: 'Jarosław',
  email: 'user3@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '190',
  weight: '80',
  birthDate: new Date('1980-12-12T23:00:00.000Z'),
  sex: 'male',
  description: 'mam dziecioka ona robi włosy w koka',
  zodiac: null,
  education: null,
  kids: 'Mam dzieci i chcę więcej',
  pets: 'Żółw',
  alcohol: null,
  smoking: null,
  gym: 'Nigdy',
  diet: null,
  school: 'Podstwowka',
  job: 'gosposia',
  position: 'misjonarska',
  cityInput: "Radlin, Powiat opolski",
  cityChosen: {
    Name: "Radlin",
    FullPlaceName: "Radlin, Powiat opolski",
    Height: 51.0647011178182,
    Width: 22.197609962563163
  },
  showMe: 'male',
  lookingFor: 'Stałego związku',
  images: [
    'assets/images/MockUsersImages/3/1.webp',
    'assets/images/MockUsersImages/3/2.webp',
    'assets/images/MockUsersImages/3/3.jpeg',
  ],
  interests: ['Gospel', 'Szisza'],
  sexualOrientations: ['Niezdefiniowana', 'Queer'],
};

export const USER_4: Register = {
  name: 'Ania',
  email: 'user4@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('2002-01-10T23:00:00.000Z'),
  sex: 'female',
  description: 'lubie foty robic',
  zodiac: null,
  education: null,
  kids: null,
  pets: null,
  alcohol: null,
  smoking: null,
  gym: null,
  diet: null,
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'all',
  lookingFor: 'Zabawy i czegoś przelotnego',
  images: [
    'assets/images/MockUsersImages/4/1.jpeg',
    'assets/images/MockUsersImages/4/2.webp',
    'assets/images/MockUsersImages/4/3.webp',
  ],
  interests: ['Fortnite', 'Ogrodnictwo', 'Festiwal filmowy'],
  sexualOrientations: ['Lesbijka'],
};

export const USER_5: Register = {
  name: 'Basia',
  email: 'user5@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('1998-07-03T23:00:00.000Z'),
  sex: 'female',
  description: null,
  zodiac: null,
  education: null,
  kids: null,
  pets: 'Królik',
  alcohol: null,
  smoking: null,
  gym: null,
  diet: 'Wszystkiego po trochu',
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'female',
  lookingFor: 'Czegoś stałego lub na krótko',
  images: [
    'assets/images/MockUsersImages/5/1.webp',
    'assets/images/MockUsersImages/5/2.jpeg',
    'assets/images/MockUsersImages/5/3.jpeg',
  ],
  interests: ['Rozwój społeczny', 'Gimnastyka'],
  sexualOrientations: ['Biseksualna'],
};

export const USER_6: Register = {
  name: 'Jola',
  email: 'user6@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '180',
  weight: '65',
  birthDate: new Date('2000-05-02T23:00:00.000Z'),
  sex: 'female',
  description: 'cos tam coś tam se gada',
  zodiac: 'Waga',
  education: 'Mam doktorat',
  kids: null,
  pets: 'Rybka',
  alcohol: null,
  smoking: null,
  gym: null,
  diet: null,
  school: '',
  job: '',
  position: '',
  cityInput: "Racibórz, Powiat raciborski",
  cityChosen: {
    Name: "Racibórz",
    FullPlaceName: "Racibórz, Powiat raciborski",
    Height: 50.0886680724141,
    Width: 18.22196181692808
  },
  showMe: 'female',
  lookingFor: 'Zabawy i czegoś przelotnego',
  images: [
    'assets/images/MockUsersImages/6/1.webp',
    'assets/images/MockUsersImages/6/2.webp',
    'assets/images/MockUsersImages/6/3.jpeg',
    'assets/images/MockUsersImages/6/4.webp',
    'assets/images/MockUsersImages/6/5.webp',
  ],
  interests: ['Gorące źródła', 'K - Pop', 'Piłka nożna', 'DIY'],
  sexualOrientations: ['Gej', 'Niezdefiniowana'],
};

export const USER_7: Register = {
  name: 'Magda',
  email: 'user7@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '55',
  birthDate: new Date('1993-12-12T23:00:00.000Z'),
  sex: 'other',
  description: 'lubie kebsy',
  zodiac: 'Ryby',
  education: 'Chodzę do liceum',
  kids: null,
  pets: null,
  alcohol: null,
  smoking: null,
  gym: 'Codziennie',
  diet: null,
  school: 'Podstwowka',
  job: '',
  position: 'piesek',
  cityInput: "Gdańsk, Gdańsk",
  cityChosen: {
    Name: "Gdańsk",
    FullPlaceName: "Gdańsk, Gdańsk",
    Height: 54.31821822930471,
    Width: 18.58963100941158
  },
  showMe: 'all',
  lookingFor: 'Nowych znajomości',
  images: [
    'assets/images/MockUsersImages/7/1.jpeg',
    'assets/images/MockUsersImages/7/2.webp',
  ],
  interests: ['Podróże', 'Prawa OzN', 'Sci - fi'],
  sexualOrientations: ['Aseksualna'],
};

export const USER_8: Register = {
  name: 'Radek',
  email: 'user8@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '190',
  weight: '80',
  birthDate: new Date('1980-12-12T23:00:00.000Z'),
  sex: 'male',
  description: 'mam dziecioka ona robi włosy w koka',
  zodiac: null,
  education: null,
  kids: 'Mam dzieci i chcę więcej',
  pets: 'Żółw',
  alcohol: null,
  smoking: null,
  gym: 'Nigdy',
  diet: null,
  school: 'Podstwowka',
  job: 'gosposia',
  position: 'misjonarska',
  cityInput: "Radlin, Powiat opolski",
  cityChosen: {
    Name: "Radlin",
    FullPlaceName: "Radlin, Powiat opolski",
    Height: 51.0647011178182,
    Width: 22.197609962563163
  },
  showMe: 'male',
  lookingFor: 'Stałego związku',
  images: [
    'assets/images/MockUsersImages/8/1.jpeg',
    'assets/images/MockUsersImages/8/2.jpeg',
    'assets/images/MockUsersImages/8/3.jpeg',
    'assets/images/MockUsersImages/8/4.jpeg',
  ],
  interests: ['Gospel', 'Szisza'],
  sexualOrientations: ['Niezdefiniowana', 'Queer'],
};

export const USER_9: Register = {
  name: 'Przemek',
  email: 'user9@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('2002-01-10T23:00:00.000Z'),
  sex: 'female',
  description: 'lubie foty robic',
  zodiac: null,
  education: null,
  kids: null,
  pets: null,
  alcohol: null,
  smoking: null,
  gym: null,
  diet: null,
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'all',
  lookingFor: 'Zabawy i czegoś przelotnego',
  images: [
    'assets/images/MockUsersImages/9/1.webp',
    'assets/images/MockUsersImages/9/2.webp',
    'assets/images/MockUsersImages/9/3.webp',
  ],
  interests: ['Fortnite', 'Ogrodnictwo', 'Festiwal filmowy'],
  sexualOrientations: ['Lesbijka'],
};

export const USER_10: Register = {
  name: 'Ewelina',
  email: 'user10@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('1998-07-03T23:00:00.000Z'),
  sex: 'female',
  description: null,
  zodiac: null,
  education: null,
  kids: null,
  pets: 'Królik',
  alcohol: null,
  smoking: null,
  gym: null,
  diet: 'Wszystkiego po trochu',
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'female',
  lookingFor: 'Czegoś stałego lub na krótko',
  images: [
    'assets/images/MockUsersImages/10/1.jpeg',
    'assets/images/MockUsersImages/10/2.jpeg',
    'assets/images/MockUsersImages/10/3.jpeg',
    'assets/images/MockUsersImages/10/4.jpeg',
  ],
  interests: ['Rozwój społeczny', 'Gimnastyka'],
  sexualOrientations: ['Biseksualna'],
};

export const USER_11: Register = {
  name: 'Jarosława',
  email: 'user11@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '190',
  weight: '80',
  birthDate: new Date('1980-12-12T23:00:00.000Z'),
  sex: 'male',
  description: 'mam dziecioka ona robi włosy w koka',
  zodiac: null,
  education: null,
  kids: 'Mam dzieci i chcę więcej',
  pets: 'Żółw',
  alcohol: null,
  smoking: null,
  gym: 'Nigdy',
  diet: null,
  school: 'Podstwowka',
  job: 'gosposia',
  position: 'misjonarska',
  cityInput: "Radlin, Powiat opolski",
  cityChosen: {
    Name: "Radlin",
    FullPlaceName: "Radlin, Powiat opolski",
    Height: 51.0647011178182,
    Width: 22.197609962563163
  },
  showMe: 'male',
  lookingFor: 'Stałego związku',
  images: [
    'assets/images/MockUsersImages/11/1.jpeg',
    'assets/images/MockUsersImages/11/2.webp',
  ],
  interests: ['Gospel', 'Szisza'],
  sexualOrientations: ['Niezdefiniowana', 'Queer'],
};

export const USER_12: Register = {
  name: 'Kasia',
  email: 'user12@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('2002-01-10T23:00:00.000Z'),
  sex: 'female',
  description: 'lubie foty robic',
  zodiac: null,
  education: null,
  kids: null,
  pets: null,
  alcohol: null,
  smoking: null,
  gym: null,
  diet: null,
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'all',
  lookingFor: 'Zabawy i czegoś przelotnego',
  images: [
    'assets/images/MockUsersImages/12/1.webp',
    'assets/images/MockUsersImages/12/2.jpeg',
  ],
  interests: ['Fortnite', 'Ogrodnictwo', 'Festiwal filmowy'],
  sexualOrientations: ['Lesbijka'],
};

export const USER_13: Register = {
  name: 'Justyna',
  email: 'user13@mail.pl',
  password: 'dziendobry1',
  confirmedPassword: 'dziendobry1',
  height: '160',
  weight: '50',
  birthDate: new Date('1998-07-03T23:00:00.000Z'),
  sex: 'female',
  description: null,
  zodiac: null,
  education: null,
  kids: null,
  pets: 'Królik',
  alcohol: null,
  smoking: null,
  gym: null,
  diet: 'Wszystkiego po trochu',
  school: '',
  job: 'fotografka',
  position: '',
  cityInput: "Dębe, Powiat legionowski",
  cityChosen: {
    Name: "Dębe",
    FullPlaceName: "Dębe, Powiat legionowski",
    Height: 52.49698438956806,
    Width: 20.917981567145162
  },
  showMe: 'female',
  lookingFor: 'Czegoś stałego lub na krótko',
  images: [
    'assets/images/MockUsersImages/13/1.webp',
    'assets/images/MockUsersImages/13/2.webp',
  ],
  interests: ['Rozwój społeczny', 'Gimnastyka'],
  sexualOrientations: ['Biseksualna'],
};