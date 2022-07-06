import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReferenceMp } from 'src/app/models/referneceMp.model';
import { Reserva } from 'src/app/models/reservas.model';
import { ReferenceMpService } from 'src/app/services/referencesMp.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { SocketIoService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterContentChecked {

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
    // this.socketIoService.outEven.subscribe((res: ReferenceMp) => {
    //   let index = 4;
    //   console.log("Received of " + environment.url);

    //   for (let unRegistro in this.listReservasOnline) {
    //     if (index == 0) break;
    //     this.listReservasOnline[index] = this.listReservasOnline[index - 1];
    //     index--;
    //   }
    //   this.listReservasOnline[0] = res;
    // });
  }

  ngOnInit(): void {
    this.initFormSearch();
    this.getReference(5);
  };

  ngAfterContentChecked(): void {
    const colorItemRegister = document.querySelectorAll('.listRegistros');
    const colorItemRegisterFilter = document.querySelectorAll('.listRegistrosFilter');

    if (colorItemRegister) {
      colorItemRegister.forEach(unItem => {
        if (unItem.innerHTML.includes("pending")) {
          unItem.classList.remove('statusAproved');
          unItem.classList.remove('statusRefundsCancelled');
          unItem.classList.add('statusPendding');
        } else if (unItem.innerHTML.includes("approved")) {
          unItem.classList.remove('statusPendding');
          unItem.classList.remove('statusRefundsCancelled');
          unItem.classList.add('statusAproved');
        } else {
          unItem.classList.remove('statusPendding');
          unItem.classList.remove('statusAproved');
          unItem.classList.add('statusRefundsCancelled');
        }
      });
    }

    if (colorItemRegisterFilter) {
      colorItemRegisterFilter.forEach(unItem => {
        if (unItem.innerHTML.includes("pending")) {
          unItem.classList.remove('statusAproved');
          unItem.classList.remove('statusRefundsCancelled');
          unItem.classList.add('statusPendding');
        } else if (unItem.innerHTML.includes("approved")) {
          unItem.classList.remove('statusPendding');
          unItem.classList.remove('statusRefundsCancelled');
          unItem.classList.add('statusAproved');
        } else {
          unItem.classList.remove('statusPendding');
          unItem.classList.remove('statusAproved');
          unItem.classList.add('statusRefundsCancelled');
        }
      });
    }

  };

  initFormSearch(): void {
    this.formSearch = this.fb.group({
      reservaId: [''],
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

          if (anReserva.estado == 'P') anReserva.estado = 'pending';
          else if (anReserva.estado == 'E') anReserva.estado = 'approved';

        });

      }, error => {
      });
  };

}
