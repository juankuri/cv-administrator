import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  accesoCertificate = "certificate service running...";
  private dbPath = '/certificates';

  certificateRef: AngularFirestoreCollection<Certificates>;

  constructor(private db: AngularFirestore) {
    this.certificateRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<Certificates> {
    return this.certificateRef;
  }

   createCertificate(myCertificate : Certificates) : any {
    return this.certificateRef.add({...myCertificate});
   }

   deleteCertificate(id? : string) : Promise<void> {
      return this.certificateRef.doc(id).delete();
   }

   updateCertificates(id: string, data: Certificates): Promise<void> {
       return this.certificateRef.doc(id).update(data);
     }
}
