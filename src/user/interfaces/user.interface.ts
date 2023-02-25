export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt?: Date | number; // timestamp of creation
  updatedAt?: Date | number; // timestamp of last update
}

export interface UpdatePassword {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
