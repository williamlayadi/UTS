import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}



  betul : boolean = false;
  a =0;
  //b = Math.random()*20
  b = Math.floor(Math.random()*10+1)

  text :string;
  result(){
    if(this.a == this.b){
      this.text = "yes"
      this.betul = true;
    }
    else{
      this.text = "no"
      this.betul = false;
    }
  }

}
