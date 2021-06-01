import { Component, OnInit } from '@angular/core';
import { Eventoes } from 'src/app/models/eventoes.model';
import { EventoesService } from 'src/app/services/eventoes.services';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  listEventosHabilitados: Eventoes[];
  listEventosHabilitadosOriginal: Eventoes[];

  isLoading: boolean;

  constructor(
    private eventoesService: EventoesService
  ) {
    this.listEventosHabilitados = [];
    this.listEventosHabilitadosOriginal = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {

    this.eventoesService.getEventos().subscribe(
      (eventoes: Eventoes[]) => {

        eventoes.forEach(unEvento => {
          if (unEvento.medioPago.includes("MP") && !unEvento.archivar) {
            this.listEventosHabilitados.push(unEvento);
            this.listEventosHabilitadosOriginal.push(unEvento);
          }
        })
      }, error => {

      }, () => {
        this.isLoading = false;
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

  }
}
