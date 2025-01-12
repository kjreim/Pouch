import { Injectable } from '@angular/core';
import PouchDb from 'pouchdb';

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
}
