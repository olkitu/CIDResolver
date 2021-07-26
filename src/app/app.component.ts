import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export interface CellidToENBConverter {
  net: 'LTE'| 'UMTS' | 'GSM';
  cellid: number | null;
}

export interface CellidToENBConverterResult {
  net: 'LTE'| 'UMTS' | 'GSM';
  cellid: number;
  sectorid?: number;
  siteid: number;
  cellidhex: string;
  sectoridhex?: string;
  siteidhex: string;
  rncid?: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Cell ID Converter';

  faGithub = faGithub;
  
  submitDisabled: boolean = false;
  formData: CellidToENBConverter = { net: 'LTE', cellid: null};
  cellid: string = "";

  cellidToENBConverterResult: CellidToENBConverterResult | undefined;

  submitForm() {
    this.submitDisabled = true;

    if(this.formData.cellid == null)
      return;
    
    let siteid = this.formData.cellid / 10 ^ 0;
    let sectorid = undefined;
    let sectoridhex = undefined;
    let rncid = undefined;
    
    if(this.formData.net == 'LTE') {
      sectorid = this.formData.cellid & 0xff;
      siteid = this.formData.cellid >> 8
      sectoridhex = sectorid.toString(16);
    }

    if(this.formData.net == 'UMTS') {
      rncid = this.formData.cellid >> 16;
    }

    let cellidhex = this.formData.cellid.toString(16);
    let siteidhex = siteid.toString(16);

    this.cellidToENBConverterResult = {
      net: this.formData.net,
      cellid: this.formData.cellid,
      cellidhex: cellidhex,
      sectorid: sectorid,
      siteid: siteid,
      sectoridhex: sectoridhex,
      siteidhex: siteidhex,
      rncid: rncid
    }
    
    this.submitDisabled = false;
  }

}
