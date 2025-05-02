import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  interests: Interests[] = [];
  myInterests: Interests = new Interests();
  isExpanded: boolean[] = [];

  constructor(public interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.interests = data;
      this.isExpanded = new Array(this.interests.length).fill(false);
    });
  }

  toggleInterest(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  agregarInterest(): void {
    this.interestsService.createInterests(this.myInterests).then(() => {
      this.myInterests = new Interests();
    });
  }

  deleteInterest(id?: string): void {
    this.interestsService.deleteInterests(id);
  }

  actualizarInterest(id: string): void {
    const item = this.interests.find(e => e.id === id);
    if (!item) return;
    this.interestsService.updateInterest(id, item);
  }
}
