import {Injectable} from '@angular/core';
import PouchDb from 'pouchdb';
import {NewStrip, Strip} from '../models/strip';

@Injectable({
  providedIn: 'root'
})
export class PouchService {

  private kittens: PouchDB.Database;
  constructor() {
    this.kittens = new PouchDb('kittens');
  }

  public getInfo(): Promise<PouchDB.Core.DatabaseInfo> {
    return this.kittens.info();
  }

  public getStrip(id: string): Promise<PouchDB.Core.Document<Strip>> {
    return this.kittens.get<Strip>(id);
  }

  public addItem(doc: NewStrip): Promise<PouchDB.Core.Response> {
    console.log(doc);
    return this.kittens.put(doc.toJSON());
  }

  public delete(doc: Strip): Promise<PouchDB.Core.Response> {
    const removeDoc: PouchDB.Core.RemoveDocument = {
      _id: doc._id,
      _rev: doc._rev!
    }
    return this.kittens.remove(removeDoc);
  }
}
