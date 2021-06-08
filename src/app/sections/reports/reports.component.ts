import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReferenceMp } from 'src/app/models/referneceMp.model';
import { Reserva } from 'src/app/models/reservas.model';
import { ReferenceMpService } from 'src/app/services/referencesMp.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { SocketIoService } from 'src/app/services/socketio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  formSearch: FormGroup;

  listReservas: Reserva[];
  listReservasOnline: ReferenceMp[];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private socketIoService: SocketIoService,
    private referenceMpService: ReferenceMpService
  ) {
    this.listReservasOnline = [];
    this.socketIoService.outEven.subscribe((res: ReferenceMp) => {
      console.log("Received of " + environment.url);
      this.listReservasOnline.push(res);
    });
  }

  ngOnInit(): void {
    this.initFormSearch();
    this.getReference(5);
  };

  initFormSearch(): void {
    this.formSearch = this.fb.group({
      id: [''],
      clienteDni: ['']
    });
  };

  getReference(limit?: number): void {
    this.referenceMpService.getReferencesMp(limit).subscribe(references => {
      this.listReservasOnline = references;
    }, error => {

    });
  };

  searchReserva(): void {
    this.reservasService.getReservaByWhere(this.formSearch).subscribe(
      resultReservas => {
        this.listReservas = resultReservas;

        this.listReservas.forEach(anReserva => {

          if (anReserva.estado == 'P') anReserva.estado = 'pendding';
          else if (anReserva.estado == 'E') anReserva.estado = 'approved';

        });

      }, error => {
      });
  };

}
