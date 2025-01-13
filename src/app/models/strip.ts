export class Strip {

  constructor(
    public _id: PouchDB.Core.DocumentId,
    public name: string,
    public location: string,
    public crop: string,
    public season: string,
    public _rev?: string,
  ) {
  }

  public toJSON(): any {
    const tmp = this._rev === undefined ? {
      _id: this._id,
      name: this.name,
      location: this.location,
      crop: this.crop,
      season: this.season,
    } : {
      _id: this._id,
      name: this.name,
      location: this.location,
      crop: this.crop,
      season: this.season,
      _rev: this._rev
    };
    return tmp;
  }
}

export type NewStrip = Omit<Strip, "_rev">
