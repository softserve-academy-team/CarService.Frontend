import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userPhoto' })
export class UserPhotoPipe implements PipeTransform {

    private readonly defaultUserPhoto: any = { 'src': 'assets/pipe-photos/defaultUserPhoto.png' };

    transform(value: string): string {
        if (value != undefined && value != null && value != "") return value;
        else return this.defaultUserPhoto.src;
    }

}