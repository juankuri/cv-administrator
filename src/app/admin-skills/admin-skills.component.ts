import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  skills: Skills[] = [];
  mySkill: Skills = new Skills();
  isExpanded: boolean[] = [];

  constructor(public skillsService: SkillsService) {
    this.skillsService.getSkill().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.skills = data;
      this.isExpanded = new Array(this.skills.length).fill(false);
    });
  }

  toggleSkill(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  AgregarSkill() {
    this.skillsService.createSkill(this.mySkill).then(() => {
      this.mySkill = new Skills();
    });
  }

  deleteSkill(id?: string) {
    this.skillsService.deleteSkill(id);
  }

  actualizarSkills(id: string) {
    const item = this.skills.find(e => e.id === id);
    if (!item) return;
    this.skillsService.updateSkill(id, item);
  }
}
