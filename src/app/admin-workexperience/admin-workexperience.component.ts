import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  btntxt = 'Agregar';
  workExperience: WorkExperience[] = [];
  myWorkExperience = new WorkExperience();
  isExpExperienced: boolean[] = [];

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(data => {
      this.workExperience = data;
      this.isExpExperienced = new Array(this.workExperience.length).fill(false);
    });
  }

  toggleExperience(index: number): void {
    this.isExpExperienced[index] = !this.isExpExperienced[index];
  }

  AgregarJob(): void {
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      this.myWorkExperience = new WorkExperience();
    });
  }

  deleteJob(id?: string): void {
    this.workExperienceService.deleteWorkExperience(id);
  }

  actualizarWorkExperience(id: string): void {
    const item = this.workExperience.find(e => e.id === id);
    if (item) {
      this.workExperienceService.updateWorkExperience(id, item);
    }
  }
}
