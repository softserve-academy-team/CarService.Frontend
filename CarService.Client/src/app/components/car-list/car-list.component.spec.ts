import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CarListComponent } from './car-list.component';
import { MatDividerModule, MatCardModule } from '@angular/material';
import { BaseCarInfo } from '../../models/base-car-info';
import { CarService } from '../../services/car.service';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Directive, Input, Component } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';


@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({
  selector: 'app-filter',
  template: ``
})
class FilterComponent {

}

describe('Car-ListComponent', () => {
  let fixture: ComponentFixture<CarListComponent>;
  let component: CarListComponent;
  let deCarList: DebugElement[];
  let carName: HTMLHeadingElement[];
  let pricesUSD: HTMLParagraphElement[];
  let pricesUAH: HTMLParagraphElement[];
  let race: HTMLParagraphElement[];
  let city: HTMLParagraphElement[];
  let fuelNames: HTMLParagraphElement[];
  let gearBoxNames: HTMLParagraphElement[];
  let debugElement: DebugElement;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  const countCars = 3;

  let mockRepository = {
    getListOfRandomCars: function(): Observable<BaseCarInfo[]> {
      return Observable.of<BaseCarInfo[]>([
        new BaseCarInfo(20066946,"Mercedes-Benz","E-Class",2014,"https://cdn.riastatic.com/photosnew/auto/photo/mercedes-benz_e-class__190059614sx.jpg",26900,751855,21636,"147 тыс. км",147,"Хмельницкий","Газ/бензин, 2 л.","Автомат"),
        new BaseCarInfo(20939807,"Fiat","500",2012,"https://cdn.riastatic.com/photosnew/auto/photo/fiat_500__202821700sx.jpg",7300,203524,5865,"50 тыс. км",50,"Киев","Бензин, 0.9 л.","Ручная / Механика"),
        new BaseCarInfo(21074479,"Volkswagen","Golf Variant",2013,"https://cdn.riastatic.com/photosnew/auto/photo/volkswagen_golf-variant__204284184sx.jpg",11700,326196,9400,"199 тыс. км",199,"Хмельницкий","Дизель, 1.6 л.","Автомат")
      ])
    }
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CarListComponent, RouterLinkStubDirective, FilterComponent],
      imports: [MatDividerModule, MatCardModule],
      providers: [{ provide: CarService, useValue: mockRepository}, CommunicationService]
    });
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.car-list-container'));
    deCarList = debugElement.queryAll(By.css('.car-list'));
    
    carName = new Array(countCars);
    pricesUSD = new Array(countCars);
    pricesUAH = new Array(countCars);
    race = new Array(countCars);
    city = new Array(countCars);
    fuelNames = new Array(countCars);
    gearBoxNames = new Array(countCars);
    for (let i = 0; i < countCars; i++) {
      carName[i] = deCarList[i].query(By.css('.car-name')).query(By.css('h2')).nativeElement;
      pricesUSD[i] = deCarList[i].query(By.css('.carPriceUSD')).nativeElement;
      pricesUAH[i] = deCarList[i].query(By.css('.carPriceUAH')).nativeElement;
      race[i] = deCarList[i].queryAll(By.css('.info-item'))[0].query(By.css('p')).nativeElement;
      city[i] = deCarList[i].queryAll(By.css('.info-item'))[3].query(By.css('p')).nativeElement;
      fuelNames[i] = deCarList[i].queryAll(By.css('.info-item'))[2].query(By.css('p')).nativeElement;
      gearBoxNames[i] = deCarList[i].queryAll(By.css('.info-item'))[1].query(By.css('p')).nativeElement;
    }
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  })

  it("should display all cars", () => {
    expect(deCarList.length).toBe(countCars);
  });
  
  it("should redirect to correct page with car details by click on image of concrete car", () => {
    expect(links[0].linkParams).toBe('/cardetail/20066946');
    expect(links[1].linkParams).toBe('/cardetail/20939807');
    expect(links[2].linkParams).toBe('/cardetail/21074479');
  });

  it("should display markName, modelName, year", () => {
    expect(carName[0].textContent).toContain("Mercedes-Benz E-Class 2014");
    expect(carName[1].textContent).toContain("Fiat 500 2012");
    expect(carName[2].textContent).toContain("Volkswagen Golf Variant 2013");
  });

  it("should display priceUSD", () => {
    expect(pricesUSD[0].textContent).toContain("26900$ /");
    expect(pricesUSD[1].textContent).toContain("7300$ /");
    expect(pricesUSD[2].textContent).toContain("11700$ /");
  });

  it("should display priceUAH", () => {
    expect(pricesUAH[0].textContent).toContain("751855₴");
    expect(pricesUAH[1].textContent).toContain("203524₴");
    expect(pricesUAH[2].textContent).toContain("326196₴");
  });


  it("should display race", () => {
    expect(race[0].textContent).toContain("147 тыс. км");
    expect(race[1].textContent).toContain("50 тыс. км");
    expect(race[2].textContent).toContain("199 тыс. км");
  });

  it("should display city", () => {
    expect(city[0].textContent).toContain("Хмельницкий");
    expect(city[1].textContent).toContain("Киев");
    expect(city[2].textContent).toContain("Хмельницкий");
  });

  it("should display fuelName", () => {
    expect(fuelNames[0].textContent).toContain("Газ/бензин, 2 л.");
    expect(fuelNames[1].textContent).toContain("Бензин, 0.9 л.");
    expect(fuelNames[2].textContent).toContain("Дизель, 1.6 л.");
  });

  it("should display gearBoxName", () => {
    expect(gearBoxNames[0].textContent).toContain("Автомат");
    expect(gearBoxNames[1].textContent).toContain("Ручная / Механика");
    expect(gearBoxNames[2].textContent).toContain("Автомат");
  });
});