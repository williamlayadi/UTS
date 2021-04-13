import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //web
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage : string[] = [];
  constructor(
    private afStorage:AngularFireStorage,
    public fotoService : FotoService

  ) {

   }

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
