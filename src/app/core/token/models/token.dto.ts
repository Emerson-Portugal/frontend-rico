export interface TokenDto {
  token: string
  user: {
    role: string;
  };
  expiration: string
}
