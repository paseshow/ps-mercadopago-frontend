import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReferenceMp } from 'src/app/models/referneceMp.model';
import { Reserva } from 'src/app/models/reservas.model';
import { ReferenceMpService } from 'src/app/services/referencesMp.service';
import { RefundsService } from 'src/app/services/refunds.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit, AfterViewChecked {

  @ViewChild('btnCerrar', { static: false }) btnCerrar: ElementRef;

  formSearch: FormGroup;
  formRefunds: FormGroup;

  listReservas: Reserva[];
  reservaSelect: Reserva = null;

  referenceReservaSelected: ReferenceMp = null;

  isOverallRefunds: boolean = false;
  isRefunds: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private referenceMpService: ReferenceMpService,
    private refundsService: RefundsService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.initForms();
  };

  ngAfterViewChecked(): void {
    let listaRegistros = document.querySelectorAll('.listRegistro');
    if (listaRegistros) {
      listaRegistros.forEach(unRegistro => {
        unRegistro.classList.add('registerAprovedd');
      });
    }
  };

  initForms(): void {
    this.formSearch = this.fb.group({
      reservaId: [''],
      clienteDni: [''],
      estado: ["E"]
    });

    this.formRefunds = this.fb.group({
      idTransaccion: [null],
      motivo: [''],
      devolucionTotal: [''],
      devolucionParcial: [''],
      monto: [''],
      eventoId: []
    })
  };


  searchReserva(): void {
    //ACTIVAMOS SPINNER LOAD
    this.loadingService.setLoader(true);

    this.reservasService.getReservaByWhere(this.formSearch).subscribe(
      resultReservas => {
        this.listReservas = resultReservas;
        //ACTIVAMOS SPINNER LOAD
        this.loadingService.setLoader(true);

        this.listReservas.forEach(anReserva => {
          if (anReserva.estado == 'P') anReserva.estado = 'pendding';
          else if (anReserva.estado == 'E') anReserva.estado = 'approved'
          //DCTIVAMOS SPINNER LOAD
          this.loadingService.setLoader(false);
        });
      }, error => {
        //DEACTIVAMOS SPINNER LOAD EN ERROR
        this.loadingService.setLoader(false);
      });
  };

  dataReferenceByReservaId(reserva): void {
    //ACTIVAMOS SPINNER LOAD
    this.loadingService.setLoader(true);


    this.reservaSelect = reserva;
    this.formRefunds.get('monto').setValue(this.reservaSelect.importeTotal);
    this.formRefunds.get('eventoId').setValue(this.reservaSelect.eventoId);

    this.referenceMpService.getReferenceMpByReservaId(this.reservaSelect.id).subscribe(
      reference => {
        //DESACTIVAMOS SPINNER LOAD
        this.loadingService.setLoader(false);
        

        this.referenceReservaSelected = reference;
        this.formRefunds.get('idTransaccion').setValue(reference.idTransaccionMp);
      }, error => {

      }
    );
  };

  overallRefund(): void {
    this.isRefunds = true;
    this.refundsService.overallRefunds(this.formRefunds).subscribe(
      resultOverallRefund => {
        this.isRefunds = true;
        this.listReservas = null;
        this.formRefunds.reset();
        this.btnCerrar.nativeElement.click();
      }, error => {

      }
    );
  };


  refundsPartial(): void {
    this.isRefunds = true;

    this.refundsService.refundsPartial(this.formRefunds).subscribe(
      responseRefundsPartial => {
        this.isRefunds = true;
        this.listReservas = null;
        this.formRefunds.reset();
        this.btnCerrar.nativeElement.click();
      }, error => {

      }
    );
  };


  //HABILITAR BOTONES
  
  //DEVOLUCION PARCIAL 
  validRefundsPartial(): boolean {
    return this.formRefunds.get('devolucionParcial').value != 'devolucion' || (this.reservaSelect.importeTotal < this.formRefunds.get('monto').value 
    || 0 >= this.formRefunds.get('monto').value)
    || (this.formRefunds.get('motivo')).value == ''
  };

  //DEVOLUCION TOTAL
  btnDevTotal() {
    return this.formRefunds.get('motivo').value == ''
      || (this.formRefunds.get('devolucionTotal')).value != 'devolucion'
  };
}
