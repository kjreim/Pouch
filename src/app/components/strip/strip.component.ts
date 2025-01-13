import {
  Component,
  computed,
  inject,
  resource,
  signal,
  Signal
} from '@angular/core';
import {PouchService} from '../../services/pouch.service';
import {Strip} from '../../models/strip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-strip',
  imports: [
    MatButtonModule
  ],
  templateUrl: './strip.component.html',
  styleUrl: './strip.component.scss'
})
export class StripComponent {
  private readonly pouchService: PouchService = inject(PouchService);
  public name: string = '';
  public docCount: number = 0;

  public error: string = '';

  public strip: Strip | undefined;

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

  public test(): void {
    console.log('test');
  }

  public async addStrip(): Promise<void> {
    await this.getStrip();
    this.pouchService.addItem(this.strip!)
      .then((response) => {
          console.log(response);
          this.strip!._rev = response.rev;
        },
        (error: PouchDB.Core.Error) => {
          console.log(error.message);
        });
  }

  public async deleteStrip(): Promise<void> {
    await this.getStrip();
    const deletion = await this.pouchService.delete(this.strip!);
    console.log(deletion);
    // this.pouchService.getStrip('2024|Soybeans|CV1001010')
    //   .then((response) => {
    //     console.log(response);
    //     this.pouchService.delete(response)
    //       .then((response) => console.log(response))
    //       .catch((error: PouchDB.Core.Error) => {
    //         console.log(error.message);
    //       });
    //   })
    //   .catch((error: PouchDB.Core.Error) => {
    //     console.log(error.message);
    //   });

  }

  private async getStrip(): Promise<void> {
    try {
      const response = await this.pouchService.getStrip('2024|Soybeans|CV1001010');
      this.strip = response;
    } catch (error: unknown) {
      const t = error as PouchDB.Core.Error;
      if (t.name === 'not_found') {
        this.strip = new Strip('2024|Soybeans|CV1001010', 'CV1001010', 'Adel, IA', 'Soybeans', '2024');
      } else {
        console.log(error);
      }
    }

  }
}
