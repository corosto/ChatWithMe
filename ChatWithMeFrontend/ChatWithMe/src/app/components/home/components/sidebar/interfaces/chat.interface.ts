export interface LastChats {
  name: string,
  message: string,
  image: string,
}

export interface Message {
  message: string,
  time: string,
  userId: string,
  image: string,//czy dawać zdjęcie?
}

export const LAST_CHATS: LastChats[] = [
  {
    name: 'Elf',
    message: "siema koksie",
    image: 'https://images.pexels.com/photos/5263291/pexels-photo-5263291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Jadwiga',
    message: "kopce gibona",
    image: 'https://images.pexels.com/photos/10510382/pexels-photo-10510382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Jarosław',
    message: "a nic nic",
    image: 'https://images.pexels.com/photos/8392532/pexels-photo-8392532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

