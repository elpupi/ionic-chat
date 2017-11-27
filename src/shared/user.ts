export class User {
  _id: number;
  _name: string;
  _avatar: string;

  constructor(id: number, name: string, avatar: string) {
    this._id = id;
    this._name = name;
    this._avatar = avatar;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

}
