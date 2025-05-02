import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  languages: Languages[] = [];
  myLanguage: Languages = new Languages();
  isExpanded: boolean[] = [];

  constructor(public languagesService: LanguagesService) {
    this.languagesService.getLanguage().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.languages = data;
      this.isExpanded = new Array(this.languages.length).fill(false);
    });
  }

  toggleLanguage(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  agregarLanguage() {
    this.languagesService.createLanguage(this.myLanguage).then(() => {
      this.myLanguage = new Languages();
    });
  }

  deleteLanguage(id?: string) {
    this.languagesService.deleteLanguage(id);
  }

  actualizarLanguage(id: string) {
    const item = this.languages.find(e => e.id === id);
    if (!item) return;
    this.languagesService.updateLanguage(id, item);
  }
}
