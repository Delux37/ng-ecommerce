export class AuthUserModel {
  constructor(
    public email: string,
    public isAdmin: boolean,
    private _token: string,
    private _tokenExpiresIn: string,
    public fbId: string
  ) {}

  get token() {
    if (
      new Date(new Date().getTime() - +this._tokenExpiresIn * 1000).getTime() <
      new Date().getTime()
    ) {
      return this._token;
    }
    return null;
  }
}
