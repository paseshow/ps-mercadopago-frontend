import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reserva } from 'src/app/models/reservas.model';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {

  formSearch: FormGroup;

  listReservas: Reserva[];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
  ) { }

  ngOnInit(): void {
    this.initFormSearch();
  };

  initFormSearch(): void {
    this.formSearch = this.fb.group({
      id: [''],
      clienteDni: [''],
      estado: ['E']
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
