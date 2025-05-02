import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btntxt : string ="Agregar";
  goalText: string ="";
  education: Education[] = [];
  myEducation : Education = new Education();
  isExpanded: boolean[] = []; // Array para controlar el estado de expansión

  constructor(public educationService : EducationService)
  {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.education = data;
      // Inicializar todos los elementos como colapsados
      this.isExpanded = new Array(this.education.length).fill(false);
      console.log(this.education);
    });
  }

  // Método para alternar la expansión de un elemento
  toggleEducation(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  AgregarEducation(){
    console.log(this.myEducation);
    this.educationService.createEducation(this.myEducation).then(() => {
      console.log('create new item succesfully');
      // Resetear el formulario después de agregar
      this.myEducation = new Education();
    });
  }

  deleteEducation(id? : string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item succesfully');
    });
    console.log(id);
  }

  actualizarEducation(id: string) {
    const item = this.education.find(e => e.id === id);
    if (!item) {
      console.warn('Elemento no encontrado');
      return;
    }
  
    this.educationService.updateEducation(id, item).then(() => {
      console.log('Elemento actualizado exitosamente');
    });
  }
}