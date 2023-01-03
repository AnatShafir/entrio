import { Settings } from "./settings";

export interface User {
  _id: string,
  username: string,
  role: 'user' | 'admin',
  settings: Settings,
}
