interface User {
  email: string;
  password: string;
  fullName: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

interface Post {
  id?: string;
  title: string;
  content: string;
  like: number;
}

const usersSeed: User[] = [
  {
    email: 'usuario1@email.com',
    password: 'contrasena1',
    fullName: 'Usuario Uno',
    age: 25,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'usuario2@email.com',
    password: 'contrasena2',
    fullName: 'Usuario Dos',
    age: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'usuario3@email.com',
    password: 'contrasena3',
    fullName: 'Usuario Tres',
    age: 22,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'usuario4@email.com',
    password: 'contrasena4',
    fullName: 'Usuario Cuatro',
    age: 28,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'usuario5@email.com',
    password: 'contrasena5',
    fullName: 'Usuario Cinco',
    age: 35,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const postsSeed: Post[] = [];
for (let i = 0; i < 20; i++) {
  postsSeed.push({
    title: `Título de la publicación ${i + 1}`,
    content: `Contenido de la publicación ${i + 1}`,
    like: Math.floor(Math.random() * 50) + 1,
  });
}


export { usersSeed, postsSeed };