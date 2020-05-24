export class User {
  public email: string;
  public password: string;
  public liked: string[];
  public playlist: string[];
  constructor(
    email: string,
    password: string,
    liked: string[],
    playlist: string[]
  ) {
    this.email = email;
    this.password = password;
    this.liked = liked;
    this.playlist = playlist;
  }
}
