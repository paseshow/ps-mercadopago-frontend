import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReferenceMp } from 'src/app/models/referneceMp.model';
import { Reserva } from 'src/app/models/reservas.model';
import { ReferenceMpService } from 'src/app/services/referencesMp.service';
import { RefundsService } from 'src/app/services/refunds.service';
import { ReservasService } from 'src/app/services/reservas.service';

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
    private refundsService: RefundsService
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

  dataReferenceByReservaId(reserva): void {
    this.reservaSelect = reserva;
    this.formRefunds.get('monto').setValue(this.reservaSelect.importeTotal);
    this.formRefunds.get('eventoId').setValue(this.reservaSelect.eventoId);
    
    this.referenceMpService.getReferenceMpByReservaId(this.reservaSelect.id).subscribe(
      reference => {
        this.referenceReservaSelected = reference;
        this.formRefunds.get('idTransaccion').setValue(reference.idTransaccionMp);
      }, error => {

      }
    );
  };

  overallRefund(): void {
    this.isRefunds = true;
    debugger
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

  validRefundsPartial(): boolean {
    return this.formRefunds.get('devolucionParcial').value != 'devolucion' || (this.reservaSelect.importeTotal < this.formRefunds.get('monto').value || 0 >= this.formRefunds.get('monto').value);
  };
}
