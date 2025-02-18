export interface User {
  _id: string;
  name: string;
  age: string;
  weight: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface LoginResponse {
  message: string;
  entity: User;
}
