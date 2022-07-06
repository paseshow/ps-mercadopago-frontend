import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Eventoes } from 'src/app/models/eventoes.model';
import { EventoesService } from 'src/app/services/eventoes.services';
import { MercadoPagoService } from 'src/app/services/mercadoPago.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  @ViewChild('itemEvent', { static: false }) itemEvent: ElementRef;

  formDataMercadoPago: FormGroup;

  listEventosHabilitados: Eventoes[];
  listEventosHabilitadosOriginal: Eventoes[];

  isLoading: boolean;
  isEventoSelect: boolean;
  notDataConfigurations: boolean;

  constructor(
    private eventoesService: EventoesService,
    private mercadoPagoService: MercadoPagoService,
    private fb: FormBuilder,
  ) {
    this.listEventosHabilitados = [];
    this.listEventosHabilitadosOriginal = [];
    this.isLoading = true;
    this.isEventoSelect = false;
    this.notDataConfigurations = false;
  }

  ngOnInit(): void {
    this.initFormDataCuentaMercadoPago();
    this.getEventos();
  }

  initFormDataCuentaMercadoPago(): void {
    this.formDataMercadoPago = this.fb.group({
      id: [''],
      accessToken: ['', Validators.required],
      publicKey: ['', Validators.required],
      userIdMp: [, Validators.required],
      nombreCuenta: ['', Validators.required],
      nombre: ['paseshow',],
      eventoId: ['', Validators.required]
    })
  };

  getDataCuentaMercadoPago(eventoId): void {

    this.mercadoPagoService.getDataCuentaVinculada(eventoId).subscribe(
      dataMercadoPago => {
        // SETEAMOS VALORES EN EL FORM
        this.formDataMercadoPago.get('id').setValue(dataMercadoPago.id);
        this.formDataMercadoPago.get('accessToken').setValue(dataMercadoPago.accessToken);
        this.formDataMercadoPago.get('publicKey').setValue(dataMercadoPago.publicKey);
        this.formDataMercadoPago.get('userIdMp').setValue(dataMercadoPago.userIdMp);
        this.formDataMercadoPago.get('nombreCuenta').setValue(dataMercadoPago.nombreCuenta);
        this.formDataMercadoPago.get('eventoId').setValue(dataMercadoPago.eventoId);

      }, error => {
        this.notDataConfigurations = true;
      });

  };

  getEventos(): void {

    this.eventoesService.getEventos().subscribe(
      (eventoes: Eventoes[]) => {

        eventoes.forEach(unEvento => {
          if (unEvento.medioPago.includes("MP") && !unEvento.archivar) {
            // GUARDAMOS LOS REGISTROS EN DOS ARREGLOS PARA LUEGO UTILIZARLO PARA REALIZAR EL FILTRO BY ID
            // ALTERANDO UNO Y OTRO DEJANDOLO COMO VIENE DEL BACK ASI NO PERDEMOS DATOS
            this.listEventosHabilitados.push(unEvento);
            this.listEventosHabilitadosOriginal.push(unEvento);
          }
        })
        this.isLoading = false;
      }, error => {
        this.isLoading = false;

      }, () => {
      });
  };

  filterById(event): void {
    let auxArrayList: Eventoes[] = this.listEventosHabilitadosOriginal.slice();
    this.listEventosHabilitados = [];

    auxArrayList.forEach(unEvento => {
      if (unEvento.id.toFixed().includes(event)) {
        this.listEventosHabilitados.push(unEvento);
      }
    })

  };

  saveDataMercadoPago(): void {
    if(this.formDataMercadoPago.get('id').value) {
      this.mercadoPagoService.updateDataCuentaVinculada(this.formDataMercadoPago).subscribe(
        exist => {
          this.notDataConfigurations = false;
          this.getDataCuentaMercadoPago(this.formDataMercadoPago.get("eventoId").value);
        }, error => {
        });
    } else {
      this.mercadoPagoService.createDataCuentaVinculada(this.formDataMercadoPago).subscribe(
        exist => {
          this.notDataConfigurations = false;
          this.getDataCuentaMercadoPago(this.formDataMercadoPago.get("eventoId").value);
        }, error => {
        });
    }
  };

  openConfigurationsEventoId(eventoId, indexItemEvent): void {
    this.formDataMercadoPago.reset();
    this.isEventoSelect = true;
    this.notDataConfigurations = false;

    // le ponemos el color verde al item que se haya seleccionado, para indentificar el evento que mostrara datos 
    const linkColor = document.querySelectorAll('.itemEvent');

    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('eventSelect'));
    }

    linkColor[indexItemEvent].classList.add('eventSelect');

    this.formDataMercadoPago.get('eventoId').setValue(eventoId);
    this.formDataMercadoPago.get('nombre').setValue('paseshow');

    this.getDataCuentaMercadoPago(eventoId);
  };

}
