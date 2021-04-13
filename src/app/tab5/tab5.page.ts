import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';


export interface fileFoto{
  name:string; //filepath
  path:string; //web
}


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})



export class Tab5Page implements OnInit {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  Tanggal:string;
  Nilai :string;
  constructor(
    afs : AngularFirestore
  ) {
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();
   }
   simpan(){
     this.isiDataColl.doc(this.Judul).set({
       judul : this.Judul,
       isi : this.Isi,
       tanggal:this.Tanggal,
       nilai : this.Nilai
     })

   }

   edit(event){
    this.Judul = event

    this.Isi = ""
    this.Tanggal=""
    this.Nilai=""
    // this.isiDataColl.doc(event).get({
    //   judul : this.Judul,
    //    isi : this.Isi,
    //    tanggal:this.Tanggal,
    //    nilai : this.Nilai

    // })

   }
   hapus(event){
      this.isiDataColl.doc(event).delete()
   }
  ngOnInit() {
  }


}
interface data{
  judul:string,
  isi:string,
  tanggal:string,
  nilai:string
}
