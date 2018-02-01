import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { NameValuePair } from '../../models/name-value-pair';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {tap} from 'rxjs/operators/tap';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categoryId: number;
  myControl: FormControl = new FormControl();
  myModelControl: FormControl = new FormControl();

  makeOptions: NameValuePair[] = [];
  modelOptions: NameValuePair[] = [];

  filteredOptions: Observable<NameValuePair[]>;
  filteredModelOptions: Observable<NameValuePair[]>;
  types: NameValuePair[];

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.getCarTypes().subscribe(data => {
      this.types = data;
      console.log('data', data);
    } );

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.name),
      tap(data => console.log('dataFromFilter', data)),
      startWith(''),
      map(val => this.filter(val))
    );

    this.filteredModelOptions = this.myModelControl.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.name),
      tap(data => console.log('dataFromModelFilter', data)),
      startWith(''),
      map(val => this.filterModels(val))
    );

  }

  onTypeChosen(categoryId: number) {
    this.categoryId = categoryId;
    console.log('categoryId', categoryId);
    this.filterService.getCarMakes(categoryId)
    .subscribe((data: NameValuePair[]) => {
      data.forEach((nvp: NameValuePair) => this.makeOptions.push(nvp) );
    });
  }

  onMakeChosen() {
      const makeId = this.myControl.value.value;
      this.filterService.getCarModels(this.categoryId, makeId)
      .subscribe((data: NameValuePair[]) => {
        data.forEach((nvp: NameValuePair) => this.modelOptions.push(nvp) );
        console.log('models', data);
      });
      console.log('optionChosen: ');
      console.log('this.myControl.value ', this.myControl.value);
    }
    onModelChosen() {
      console.log('onModelChosen()');
      console.log('this.myModelControl.value', this.myModelControl.value);
    }

  filter(val: string): NameValuePair[] {
    return this.makeOptions.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterModels(val: string): NameValuePair[] {
    return this.modelOptions.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  displayFn(nvp?: NameValuePair): string | undefined {
    return nvp ? nvp.name : undefined;
  }


}
