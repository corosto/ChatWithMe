export const CONVERSATION: conversation[] = [
  {
    message: "Cześć! Jak się masz?",
    time: "2023-10-23T10:00:00",
    userId: "user1"
  },
  {
    message: "Hej! Wszystko w porządku, a u ciebie?",
    time: "2023-10-23T10:05:00",
    userId: "user2"
  },
  {
    message: "leszczyku",
    time: "2023-10-23T10:05:20",
    userId: "user2"
  },
  {
    message: "Dobrze, dzięki! Co u ciebie słychać?",
    time: "2023-10-23T10:10:00",
    userId: "user1"
  },
  {
    message: "Ostatnio trochę pracuję i uczę się nowych rzeczy.",
    time: "2023-10-23T10:15:00",
    userId: "user2"
  },
  {
    message: "To świetnie! Jakie nowe rzeczy się uczysz?",
    time: "2023-10-23T10:20:00",
    userId: "user1"
  },
  {
    message: "Niedawno zacząłem naukę programowania. To całkiem fascynujące!",
    time: "2023-10-23T10:25:00",
    userId: "user2"
  },
  {
    message: "To naprawdę fajne! Jakie języki programowania próbujesz?",
    time: "2023-10-23T10:30:00",
    userId: "user1"
  },
  {
    message: "Na razie uczę się JavaScript i planuję poznać Pythona.",
    time: "2023-10-23T10:35:00",
    userId: "user2"
  },
  {
    message: "Świetny wybór! JavaScript i Python to bardzo popularne języki. Powodzenia w nauce!",
    time: "2023-10-23T10:40:00",
    userId: "user1"
  },
  {
    message: "Dzięki! Na pewno będę potrzebować trochę czasu, ale jestem podekscytowany.",
    time: "2023-10-23T10:45:00",
    userId: "user2"
  }
];

export interface conversation {
  message: string,
  time: Date | string,
  userId: string,
}