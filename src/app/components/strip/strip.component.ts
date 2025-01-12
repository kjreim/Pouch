import {Component, computed, inject, OnInit, resource, signal, Signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {PouchService} from '../../services/pouch.service';

@Component({
  selector: 'app-strip',
  imports: [
  ],
  templateUrl: './strip.component.html',
  styleUrl: './strip.component.scss'
})
export class StripComponent implements OnInit {
  private readonly pouchService: PouchService = inject(PouchService);
  public name: string = '';
  public docCount: number = 0;

  public error: string = '';

  public dbInfo: Signal<PouchDB.Core.DatabaseInfo | undefined> = signal(undefined);
  // public infoResource = resource({
  //   loader: () => this.pouchService.getInfo(),
  // })
  constructor() {
    const infoResource = resource({
      loader: () => this.pouchService.getInfo(),
    })
    this.dbInfo = computed(() => infoResource.value());
  }

  public ngOnInit(): void {
    // this.pouchService.getInfo().then(info => {
    //   this.name = info.db_name;
    //   this.docCount = info.doc_count;
    // }, error => this.error = error);
    // this.dbInfo = computed(() => this.infoResource.value())

  }
}
