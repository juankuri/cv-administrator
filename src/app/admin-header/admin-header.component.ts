import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  header: Header = new Header();

  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.header = data[0];
      console.log(this.header);
    });
  }

  actualizarHeader() {
    if (this.header.id) {
      this.headerService.updateHeader(this.header.id, this.header).then(() => {
        console.log('Header actualizado exitosamente');
      });
    }
  }

  
}
