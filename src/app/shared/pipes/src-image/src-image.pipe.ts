import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Pipe({
  name: 'srcImage',
  standalone: true
})
export class SrcImagePipe implements PipeTransform {

  transform(urlImage: string | null): string {
    if (!urlImage || urlImage === '')  return '';
    return environment.serverUrl + urlImage;
  }

}
