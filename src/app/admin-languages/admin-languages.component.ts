import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  languages : Languages [] = [];
  myLanguage : Languages = new Languages();

   constructor(public languagesService : LanguagesService)
   {
     console.log(this.languagesService);
     this.languagesService.getLanguage().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
     })
   }

   AgregarLanguage(){
    console.log(this.myLanguage);
    this.languagesService.createLanguage(this.myLanguage).then(() => {
      console.log('created a new item successfully');
    });
   }

   deleteLanguage(id? : string){
    this.languagesService.deleteLanguage(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
   }

   actualizarLanguage(id: string) {
    const item = this.languages.find(e => e.id === id);
    if (!item) {
      console.warn('Elemento no encontrado');
      return;
    }
  
    this.languagesService.updateLanguage(id, item).then(() => {
      console.log('Elemento actualizado exitosamente');
    });
  }
}
