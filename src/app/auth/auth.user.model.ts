export class AuthUserModel {
  constructor(
    public email: string,
    public isAdmin: boolean,
    private _token: string,
    private _tokenExpiresDate: Date,
    public fbId: string
  ) {}

  get token() {
     if ((new Date(this._tokenExpiresDate).getTime() - new Date().getTime() ) > 0) {
      return this._token;
    }
    return null;
  }

  get tokenExpiresDate() {
    return this._tokenExpiresDate;
  }
}
