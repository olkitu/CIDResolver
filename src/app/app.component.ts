import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export interface CellidToENBConverter {
  net: 'NR' | 'LTE'| 'UMTS' | 'GSM';
  nr_gnbid_length: number | string;
  cellid: string | null;
}

export interface CellidToENBConverterResult {
  net: 'NR' | 'LTE'| 'UMTS' | 'GSM';
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
  title = 'CIDResolver';

  faGithub = faGithub;
  
  submitDisabled: boolean = false;
  formData: CellidToENBConverter = { net: 'NR', nr_gnbid_length: "24", cellid: null};

  cellidToENBConverterResult: CellidToENBConverterResult | undefined;

  submitForm() {
    this.submitDisabled = true;

    if(this.formData.cellid == null)
      return;

    let cell_id = Number(this.formData.cellid);

    let siteid = cell_id / 10 ^ 0;
    let sectorid = undefined;
    let sectoridhex = undefined;
    let rncid = undefined;
    let clen = undefined;

    if(this.formData.net == 'NR') {
      clen = 36 - Number(this.formData.nr_gnbid_length);
      siteid = cell_id >> clen;
      sectorid = cell_id - (siteid << clen);
      sectoridhex = sectorid.toString(16);
    }
    
    if(this.formData.net == 'LTE') {
      sectorid = cell_id & 0xff;
      siteid = cell_id >> 8
      sectoridhex = sectorid.toString(16);
    }

    if(this.formData.net == 'UMTS') {
      rncid = cell_id >> 16;
    }

    let cellidhex = cell_id.toString(16);
    let siteidhex = siteid.toString(16);

    this.cellidToENBConverterResult = {
      net: this.formData.net,
      cellid: cell_id,
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
