import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//INTERFACE
import { ReferenceMp } from 'src/app/models/referneceMp.model';
import { Reserva } from 'src/app/models/reservas.model';

//SERVICIOS
import { ReferenceMpService } from 'src/app/services/referencesMp.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { LoadingService } from '../../services/loading.service';

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
    private referenceMpService: ReferenceMpService,
    private loadingService: LoadingService
  ) {
    this.listReservasOnline = [];
  }

  ngOnInit(): void {
    this.initFormSearch();
    // this.getReference(5);
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


  searchReserva(): void {
    //ACTIVAMOS SPINNER LOAD
    this.loadingService.setLoader(true);

    this.reservasService.getReservaByWhere(this.formSearch).subscribe(
      resultReservas => {
        this.listReservas = resultReservas;
        //DESACTIVAMOS SPINNER LOAD
        this.loadingService.setLoader(false);
        this.listReservas.forEach(anReserva => {
          
          if (anReserva.estado == 'P') anReserva.estado = 'pending';
          else if (anReserva.estado == 'E') anReserva.estado = 'approved';

        });

      }, error => {
        //ACTIVAMOS SPINNER LOAD EN ERROR
        this.loadingService.setLoader(false);
      });
  };

}
