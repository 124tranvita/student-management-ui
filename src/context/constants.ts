/** AuthContext */
export const LOGIN = "mentor/login" as const;
export const LOGOUT = "mentor/logout" as const;

export type Types = typeof LOGIN | typeof LOGOUT;
