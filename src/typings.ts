interface Register {
  id?: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Login {
  email: string;
  password: string;
}

interface Movie {
  title: string;
  description: string;
  image: string;
  price: number;
  id?: string;
}
