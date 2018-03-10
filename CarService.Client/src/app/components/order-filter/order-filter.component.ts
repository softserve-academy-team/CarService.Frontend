import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MapsAPILoader } from '@agm/core';
import { OrderSearchConfig } from '../../config-models/order-search-config';
import { NameValuePair } from '../../models/name-value-pair';
import { OrderSearchModel } from '../../models/order-search-model';
import { BaseOrderInfo } from '../../models/base-order-info';
import { OrderService } from '../../services/order.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss']
})
export class OrderFilterComponent implements OnInit {

  @Input()
  private readonly orderSearchConfig: OrderSearchConfig;

  private types: NameValuePair[] = [];
  private marks: NameValuePair[] = [];
  private models: NameValuePair[] = [];
  private readonly years: number[] = [];

  private filteredMarks: Observable<NameValuePair[]>;
  private filteredModels: Observable<NameValuePair[]>;

  private type: NameValuePair;
  private markName: string;
  private modelName: string;
  private minYear: number;
  private maxYear: number;

  private searchFormGroup: FormGroup;

  private typeControl: AbstractControl;
  private markControl: AbstractControl;
  private modelControl: AbstractControl;
  private cityControl: AbstractControl;

  @ViewChild("searchCity")
  private searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.getCarTypes().subscribe((types: NameValuePair[]) => {
      this.types = types;
    });

    for (let i = this.orderSearchConfig.maxYear; i >= this.orderSearchConfig.minYear; --i) {
      this.years.push(i);
    }

    this.searchFormGroup = this.getSearchFormGroup();

    this.typeControl = this.searchFormGroup.controls.type;
    this.markControl = this.searchFormGroup.controls.mark;
    this.modelControl = this.searchFormGroup.controls.model;
    this.cityControl = this.searchFormGroup.controls.city;

    this.initAutocomplete();

    this.typeControl.valueChanges.subscribe((value) => {
      if (value != undefined) {
        this.typeSelectedHandler();
      }
    });
    this.markControl.valueChanges.subscribe((value) => {
      if (value != undefined) {
        this.markSelectedHandler();
      }
    });
    this.modelControl.valueChanges.subscribe((value) => {
      if (value != undefined) {
        this.modelSelectedHandler();
      }
    });

    this.orderService.cityMarkerButtonClicked.subscribe((cityName: string) => {
      this.cityMarkerButtonClickedHandler(cityName);
    });
  }

  private getSearchFormGroup(): FormGroup {
    return this.formBuilder.group({
      type: new FormControl(),
      mark: this.getTextFormControl(),
      model: this.getTextFormControl(),
      city: this.getTextFormControl()
    });
  }

  private getTextFormControl(): FormControl {
    return new FormControl('', [
      Validators.maxLength(this.orderSearchConfig.textMaxLength)
    ]);
  }

  private createOrderSearchModel(): OrderSearchModel {
    let orderSearchModel = new OrderSearchModel();
    orderSearchModel.typeId = this.getValue(this.type);
    orderSearchModel.markId = this.getValue(this.markControl.value);
    orderSearchModel.modelId = this.getValue(this.modelControl.value);
    orderSearchModel.city = this.cityControl.value;
    orderSearchModel.minYear = this.minYear;
    orderSearchModel.maxYear = this.maxYear;
    return orderSearchModel;
  }

  private markFilter(val: string): NameValuePair[] {
    return this.marks.filter(m =>
      m.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private modelFilter(val: string): NameValuePair[] {
    return this.models.filter(m =>
      m.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private displayFn(nvp?: NameValuePair): string | undefined {
    return nvp ? nvp.name : undefined;
  }

  private initAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry == undefined || place.geometry == null) {
          return;
        }

        this.cityControl.setValue(place.formatted_address);
      });
    });
  }

  private getValue(nvp: NameValuePair): number {
    if (nvp != undefined
      && nvp != null
      && nvp.value != undefined
      && nvp.value != null) {

      return nvp.value;
    } else {
      return -1;
    }
  }

  private typeSelectedHandler() {
    this.markName = "";
    this.modelName = "";
    this.marks = [];
    this.models = [];
    this.filteredMarks = null;
    this.filteredModels = null;

    let typeId = this.getValue(this.type);
    if (typeId != -1) {
      this.filterService.getCarMakes(typeId).subscribe((marks: NameValuePair[]) => {
        this.marks = marks;
        this.filteredMarks = this.markControl.valueChanges
          .pipe(
            startWith<string | NameValuePair>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.markFilter(name) : this.marks.slice())
          );
      });
    }
  }

  private markSelectedHandler() {
    this.modelName = "";
    this.models = [];
    this.filteredModels = null;

    let typeId = this.getValue(this.type);
    if (typeId != -1) {
      this.fillMarkControl();
      let markId = this.getValue(this.markControl.value);
      if (markId != -1) {
        this.filterService.getCarModels(typeId, markId).subscribe((models: NameValuePair[]) => {
          this.models = models;
          this.filteredModels = this.modelControl.valueChanges
            .pipe(
              startWith<string | NameValuePair>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.modelFilter(name) : this.models.slice())
            );
        });
      }
    }
  }

  private modelSelectedHandler() {
    this.fillModelControl();
  }

  private fillMarkControl() {
    if (this.markName != undefined && this.markName != null && this.markName != "") {
      let lowerMarkName = this.markName.toString().toLowerCase();
      let mark = this.marks.find(m => m.name.toLowerCase() == lowerMarkName);
      if (mark != undefined && mark != null) {
        this.markControl.setValue(mark);
      }
    }
  }

  private fillModelControl() {
    if (this.modelName != undefined && this.modelName != null && this.modelName != "") {
      let lowerModelName = this.modelName.toString().toLowerCase();
      let model = this.models.find(m => m.name.toLowerCase() == lowerModelName);
      if (model != undefined && model != null) {
        this.modelControl.setValue(model);
      }
    }
  }

  private cityMarkerButtonClickedHandler(cityName: string) {
    this.cityControl.setValue(cityName);
  }

  search() {
    if (this.searchFormGroup.valid) {
      let orderSearchModel = this.createOrderSearchModel();
      this.orderService.orderSearchButtonClicked.emit(orderSearchModel);
    } else {
      console.log("Input data error.");
    }
  }

}