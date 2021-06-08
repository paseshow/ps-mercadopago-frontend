export interface Reserva {
    id: number,
    tipo: string,
    importeTotal: number,
    importeTotalNeto: number
    serviceChargeTotal: number
    fechaReserva: number,
    fechaFacturacion: number,
    estado: string,
    boleteria: string,
    turnoId: number,
    clienteDni: number,
    clienteNombre: string,
    clienteEmail: string,
    reservaPreferenceMpId: number,
    eventoId: number,
    eventoNombre: string,
    ubicacionEventoId: number,
    ubicacionEventoEstado: string,
    ubicacionEventoFechaIngreso: number,
    sectorEventoDescripcion: string,
    sectorEventoFechaFuncion: number,
    descuentoSectorDescripcion: string
};
