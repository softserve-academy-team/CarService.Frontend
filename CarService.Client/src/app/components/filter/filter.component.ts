import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { NameValuePair } from '../../models/name-value-pair';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {tap} from 'rxjs/operators/tap';
import { CarService } from '../../services/car.service';
import { BaseCarInfo } from '../../models/base-car-info';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categoryId: number;
  myFilterForm: FormGroup;

  makeOptions: NameValuePair[] = [];
  modelOptions: NameValuePair[] = [];

  filteredOptions: Observable<NameValuePair[]>;
  filteredModelOptions: Observable<NameValuePair[]>;
  types: NameValuePair[];

  constructor(
    private filterService: FilterService,
    private fb: FormBuilder,
    private carService: CarService,
    private communicationService: CommunicationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.filterService.getCarTypes().subscribe(data => {
      this.types = data;
      console.log('data', data);
    } );

    this.filteredOptions = this.myFilterForm.get('make').valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.name),
      startWith(''),
      tap(data => console.log('dataFromFilter', data)),
      map(val => this.filter(val))
    );

    this.filteredModelOptions = this.myFilterForm.get('model').valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.name),
      tap(data => console.log('dataFromModelFilter', data)),
      startWith(''),
      map(val => this.filterModels(val))
    );

  }


  resetForm() {
  this.myFilterForm.setValue({
    make: '',
    model: ''
  });

}

  onTypeChosen(categoryId: number) {
    this.categoryId = categoryId;
    this.makeOptions = [];
    this.modelOptions = [];
    this.myFilterForm.setValue({
      make: '',
      model: ''
    });

    this.filterService.getCarMakes(categoryId)
    .subscribe((data: NameValuePair[]) => {
      data.forEach((nvp: NameValuePair) => this.makeOptions.push(nvp) );
    });
  }

  onMakeChosen() {
      this.modelOptions = [];
      const makeId = this.myFilterForm.get('make').value.value;
      this.filterService.getCarModels(this.categoryId, makeId)
      .subscribe((data: NameValuePair[]) => {
        data.forEach((nvp: NameValuePair) => this.modelOptions.push(nvp) );
      });
    }



    onSubmit() {
        console.log('Submitting...');
        const carParams = [
          {
            name: 'categoryId', value: this.categoryId
          },
          {
            name: 'makeId', value: this.myFilterForm.get('make').value.value
          },
          {
            name: 'modelId', value: this.myFilterForm.get('model').value.value
          }
        ];

        const autoId = this.myFilterForm.get('model').value.value;
        this.carService
        .getCarBasicInfo(carParams).subscribe((data: BaseCarInfo[]) => {
          this.communicationService.sendBaseCarInfo(data);
        });
        this.resetForm();
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


  createForm() {
    this.myFilterForm = this.fb.group({
      make: [''],
      model: ['']
    });
  }

}
