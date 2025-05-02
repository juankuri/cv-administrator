import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
  certificates: Certificates[] = [];
  myCertificates: Certificates = new Certificates();
  isExpanded: boolean[] = [];

  constructor(public certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
      this.isExpanded = new Array(this.certificates.length).fill(false);
    });
  }

  toggleCertificate(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  AgregarCertificates() {
    this.certificatesService.createCertificate(this.myCertificates).then(() => {
      this.myCertificates = new Certificates();
    });
  }

  deleteCertificate(id?: string) {
    this.certificatesService.deleteCertificate(id).then(() => {
      console.log('delete item succesfully');
    });
  }

  actualizarCertificates(id: string) {
    const item = this.certificates.find(e => e.id === id);
    if (!item) {
      console.warn('Elemento no encontrado');
      return;
    }

    this.certificatesService.updateCertificates(id, item).then(() => {
      console.log('Elemento actualizado exitosamente');
    });
  }
}
