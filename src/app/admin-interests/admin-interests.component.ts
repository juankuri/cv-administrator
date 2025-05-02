import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {

  myInterests : Interests = new (Interests);
  interests : Interests [] = []

  constructor(public interestsService : InterestsService)
  {
    console.log(this.interestsService);
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.interests = data;
      console.log(this.interests);
    })
  }

  AregarInterest(){
    console.log(this.myInterests);
    this.interestsService.createInterests(this.myInterests).then(() => {
      console.log('created new item successfully');
    });
  }

  deleteInterest(id? : string){
    this.interestsService.deleteInterests(id).then(() => {
      console.log('delete item successfully');
    });
  }

  actualizarInterest(id: string) {
    const item = this.interests.find(e => e.id === id);
    if (!item) {
      console.warn('Elemento no encontrado');
      return;
    }
  
    this.interestsService.updateInterest(id, item).then(() => {
      console.log('Elemento actualizado exitosamente');
    });
  }
}
