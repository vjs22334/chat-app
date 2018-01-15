import { Injectable } from '@angular/core';

@Injectable()
export class JsLoaderService {

  constructor() { }
loadScript(dynamicScripts) {



          for (var i = 0; i < dynamicScripts .length; i++) {
              let node = document.createElement('script');
              node.src = dynamicScripts [i];
              node.type = 'text/javascript';
              node.async = false;
              document.getElementsByTagName('head')[0].appendChild(node);
          }


  }
}
