import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'carPhoto' })
export class CarPhotoPipe implements PipeTransform {

    private readonly defaultCarPhoto: any = { 'src': 'assets/pipe-photos/defaultCarPhoto.jpg' };

    transform(value: string): string {
        if (value != undefined && value != null && value != "") return value;
        else return this.defaultCarPhoto.src;
    }

}