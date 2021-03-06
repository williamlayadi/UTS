import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';
export interface fileFoto{
  name:string; //filepath
  path:string; //web
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  isiData : Observable<data[]>;

  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  Tanggal:string;
  Nilai :string;
  constructor(
    afs : AngularFirestore,
    private afStorage:AngularFireStorage,
    public fotoService : FotoService,
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
   hapus(event){
    this.isiDataColl.doc(event).delete()
 }

 edit(){

 }

  urlImageStorage : string[] = [];


  async ngOnInit() {
    await this.fotoService.loadFoto();
  }
async ionViewDidEnter(){
  await this.fotoService.loadFoto();
  this.tampilkanData();
}

  hapusFoto(){
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) =>{
        res.items.forEach((itemRef)=>{
          itemRef.delete().then(() =>{
            //menampilkan data
            this.tampilkanData();
          });
        });
      }).catch((error) =>{
        console.log(error);
      })
  }

  tampilkanData(){
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        itemRef.getDownloadURL().then(url =>{
          this.urlImageStorage.unshift(url);
        })

      })

    }).catch((error) =>{
        console.log(error);
    });
  }

  uploadFoto(){
    this.urlImageStorage=[];
    for(var index in this.fotoService.dataFoto){
      const imgfilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`
      this.afStorage.upload(imgfilepath,this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgfilepath).getDownloadURL().then((url) =>{
          this.urlImageStorage.unshift(url)
        });
      });
    }
  }

}
interface data{
  judul:string,
  isi:string,
  tanggal:string,
  nilai:string
}
