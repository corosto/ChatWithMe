# ChatWithMe

## 1. Założenia projektu
Aplikacja internetowa, która umożliwia nawiązywanie nowych znajomości oraz komunikację między użytkownikami. Aplikacja powinna umożliwiać użytkownikowi utworzenie swojego profilu, dodawanie zdjęć i opisu oraz przeglądanie profili innych użytkowników. Dodatkowo, użytkownik powinien mieć możliwość dostosowania preferencji dotyczących odkrywania profili innych użytkowników, takich jak maksymalna odległość oraz zakres wieku.

## 2. Schemat bazy danych
![image](https://github.com/corosto/ChatWithMe/assets/72280222/296beee1-90b2-4d80-a924-649f02de487d)

## 3. Realizacja projektu

### Lokalizacja użytkownika
Jest wyciągana z HTML'owego navigator'a, tylko za zgodą użytkownika. W inny wypadku pobierana jest z miejscowości wybranej przez niego przy rejestracji.

![Zrzut ekranu 2023-11-19 141734](https://github.com/corosto/ChatWithMe/assets/72280222/27a0080d-4893-46cd-8a27-da982ddd3a9e)

### Logowanie
![opera_59HkZSovrj](https://github.com/corosto/ChatWithMe/assets/72280222/54205238-89bd-4d68-a9fb-021b52570ab4)

### Rejestracja
![opera_o2x82KUgMr](https://github.com/corosto/ChatWithMe/assets/72280222/ea1f4ad4-f3bf-408d-8485-df016a531364)
![opera_vTzP5qs776](https://github.com/corosto/ChatWithMe/assets/72280222/4bcfea9e-af81-4ba4-a475-cd9d02a94dbb)
![opera_RzbOa44Q9e](https://github.com/corosto/ChatWithMe/assets/72280222/d231d51a-3320-4ed3-9e8b-348bbc66c974)
![opera_fn2K6JHP69](https://github.com/corosto/ChatWithMe/assets/72280222/610ebd99-2319-4367-b0ec-b776d49f2779)
![opera_Iw8BEe8B1b](https://github.com/corosto/ChatWithMe/assets/72280222/59655a79-b4e6-41a1-9d46-deaf2fff0b60)
![opera_0MwuzcOEcJ](https://github.com/corosto/ChatWithMe/assets/72280222/9a34d760-bac8-40ac-a359-aa772d8ff29a)

### Główny widok
![explorer_PxCsj4v7gU](https://github.com/corosto/ChatWithMe/assets/72280222/b7423863-5bb3-4743-92a0-18580559220b)
![opera_3mvdmfuUL3](https://github.com/corosto/ChatWithMe/assets/72280222/dcdd4d2c-8122-474d-ab7f-39526dfd6772)
![opera_7i2EBHGVkf](https://github.com/corosto/ChatWithMe/assets/72280222/0f83a4fd-8a5a-4d22-9213-e9b77b64067a)

### Match/Stworzenie konwersacji
Obaj użytkownicy dostają powiadomienie o nowej konwersacji jeżeli się wzajemnie polubili.

![opera_3i4xQdrXd8](https://github.com/corosto/ChatWithMe/assets/72280222/0e8f8353-68df-450e-bb69-ff2db9f3b7a3)
![opera_euBEKN1FIb](https://github.com/corosto/ChatWithMe/assets/72280222/31466a9c-b53a-47eb-b96c-2a610f87eb28)

### Chat
Chat działa za pomocą signalR.

![opera_d1iESftkOp](https://github.com/corosto/ChatWithMe/assets/72280222/a38aa41f-16ec-44e6-ab06-36dc4738bd41)
![chrome_d8OXhtzNJJ](https://github.com/corosto/ChatWithMe/assets/72280222/f1fb0804-28ea-4a40-86c9-26a615c528de)

Została dodana biblioteka wspomagająca emotikony.
![opera_mAecRqdW31](https://github.com/corosto/ChatWithMe/assets/72280222/c08118c9-b854-4615-a956-c06a0e867e73)

Użytkownicy mogą blokować się lub unmatch'ować, obie funkcje spowodują ukrycie danego chatu.
Dodatkowo zablokowanie całkowicie uniemożliwi wyświetlenie zablokowanego użytkownika, a unmatch jedynie zmieni jego polubienie na dislike.
![opera_MaRE3RRiS1](https://github.com/corosto/ChatWithMe/assets/72280222/b6bb5a41-0856-49f3-895a-5884b91cf2ee)

### Brak like'ów/super like'ów
Uzytkownicy posiadają ograniczoną ilość like'ów(30) i super like'ów(2).

![opera_5mg5WQrATS](https://github.com/corosto/ChatWithMe/assets/72280222/8305ea6c-f90f-456a-8447-01fffe383dd6)
![opera_Y289thpstN](https://github.com/corosto/ChatWithMe/assets/72280222/18dde783-0498-4a43-b463-c6c2cb9bc09f)

### Ustawienia/Edycja profilu
![opera_B020WCY3Nd](https://github.com/corosto/ChatWithMe/assets/72280222/e62a485d-2775-42ce-ad09-f5df2ed889af)
![opera_gPiOJYgGl9](https://github.com/corosto/ChatWithMe/assets/72280222/5fb74a50-e8e7-475c-974b-9902e5a4aa7d)
![opera_kmpjk34cY6](https://github.com/corosto/ChatWithMe/assets/72280222/424f7a63-93e1-4c99-b41a-56cb1869a620)
![opera_rYOKXv4h13](https://github.com/corosto/ChatWithMe/assets/72280222/2f17b0e7-5312-428c-8ca2-d32edfd191ab)
![opera_BrPEXG3nYv](https://github.com/corosto/ChatWithMe/assets/72280222/108c226b-a3e8-4c49-8bc2-af87ec84c03a)


## Dodatkowe informacje
Aplikacja posiada watcher'a który co 4 godziny usuwa wszystkie dislike'i użytkowników i przywraca podstawową ilość like'ów(30) i super like'ów(2).


* .NET 7.0.5 WebAPI
* Entity Framework Core 7.0.10
* MS SQL Server
* Angular 16

* api do pobierania miast - https://www.geonames.org/
* inspiracja - https://tinder.com/
* ikonki - https://www.svgrepo.com/
* zdjęcia - https://www.pexels.com/
* logo - https://www.freelogodesign.org/
