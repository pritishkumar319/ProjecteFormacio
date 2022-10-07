import { Pipe, PipeTransform } from '@angular/core';
import { IncidenciaGet } from './Models/Incidencia';

@Pipe({
  name: 'filterIncidencies'
})
export class FilterIncidenciesPipe implements PipeTransform {

  transform(data: IncidenciaGet[], filterType: string): any {
    if (!data || !filterType) {
    return data;
    }
    console.log(filterType);
    console.log(data.filter(item => item.sEmailResponsable === filterType))
    return data.filter(item => item.sEmailResponsable === filterType);
    }
}
