import { Component, OnInit } from '@angular/core';
import {JsLoaderService} from '../js-loader.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

   constructor(private loader:JsLoaderService){}

   ngOnInit(){
   var scripts=["assets/js/chat.js"];
   this.loader.loadScript(scripts);
}
}
