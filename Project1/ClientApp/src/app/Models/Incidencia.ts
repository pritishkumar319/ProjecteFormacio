export class Incidencia {
  sTitol: string = "";
  sDescripcio: string = "";
  sTags: string = "";
  pImatge: string = "";
  sEstat: string = "todo";
  sEmailResponsable: string = "";
  dDataCreacio: Date = new Date();
}

export class IncidenciaGet extends Incidencia {
  nID: number = -1;
}
