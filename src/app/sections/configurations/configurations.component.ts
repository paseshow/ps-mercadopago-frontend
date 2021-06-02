import { Component, OnInit } from '@angular/core';
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

  formDataMercadoPago: FormGroup;

  listEventosHabilitados: Eventoes[];
  listEventosHabilitadosOriginal: Eventoes[];

  isLoading: boolean;

  constructor(
    private eventoesService: EventoesService,
    private mercadoPagoService: MercadoPagoService,
    private fb: FormBuilder,
  ) {
    this.listEventosHabilitados = [];
    this.listEventosHabilitadosOriginal = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.initFormDataCuentaMercadoPago();
    this.getDataCuentaMercadoPago();
    this.getEventos();
  }

  getDataCuentaMercadoPago(): void {

    this.mercadoPagoService.getDataCuentaVinculada().subscribe(
      dataMercadoPago => {
        // SETEAMOS VALORES EN EL FORM
        this.formDataMercadoPago.get('id').setValue(dataMercadoPago.id);
        this.formDataMercadoPago.get('accessToken').setValue(dataMercadoPago.accessToken);
        this.formDataMercadoPago.get('publicKey').setValue(dataMercadoPago.publicKey);
        this.formDataMercadoPago.get('userIdMp').setValue(dataMercadoPago.userIdMp);
        this.formDataMercadoPago.get('nombreCuenta').setValue(dataMercadoPago.nombreCuenta);
      }, error => {

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
      }, error => {

      }, () => {
        this.isLoading = false;
      });
  };

  initFormDataCuentaMercadoPago(): void {
    this.formDataMercadoPago = this.fb.group({
      id: ['', Validators.required],
      accessToken: ['', Validators.required],
      publicKey: ['', Validators.required],
      userIdMp: [0, Validators.required],
      nombreCuenta: ['', Validators.required],
      nombre: ['paseshow',]
    })
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

    this.mercadoPagoService.updateDataCuentaVinculada(this.formDataMercadoPago).subscribe(
      exist => {

      }, error => {

      });
  };

}
