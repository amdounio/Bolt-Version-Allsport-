import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'nestedProperty'
})
export class NestedPropertyPipe implements PipeTransform {

  transform(value: any, path: any): string {
    if (!value || !path) {
      return '';
    }

    let columnValue = path.key.split('.').reduce((acc: {
      [x: string]: any;
    }, part: string | number) => acc && acc[part], value);
    if (columnValue === undefined || columnValue === null) {
      return '';
    }
    if (path.transform) {
      columnValue = path.transform(columnValue);
    }
    if (typeof columnValue === 'boolean') {
      columnValue = columnValue ? '<i class="bi bi-circle-fill text-success"></i>' : '<i class="bi bi-circle-fill text-danger"></i>';
    }
    return columnValue;
  }

}
