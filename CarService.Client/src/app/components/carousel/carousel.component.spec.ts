import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { AboutComponent } from '../about/about.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

describe('CarouselComponent', () => {

  let comp: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let deBtns: DebugElement[];
  let image: HTMLElement;
  let deContainer: DebugElement;
  let btn1: HTMLElement;
  let btn2: HTMLElement;
  let carouselContainer: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent, AboutComponent],
      imports: [MatCardModule, MatDividerModule]
    });
    fixture = TestBed.createComponent(CarouselComponent);
    comp = fixture.componentInstance;
    deBtns = fixture.debugElement.queryAll(By.css('button'));
    image = fixture.debugElement.query(By.css('img')).nativeElement;
    deContainer = fixture.debugElement.query(By.css('mat-card'));
    btn1 = deBtns[0].nativeElement;
    btn2 = deBtns[1].nativeElement;
    carouselContainer = deContainer.nativeElement;
    fixture.detectChanges();
  });
  it('should make appear buttons on the screen when carousel is being hovered over', () => {
    deContainer.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(comp.hide).toBe(false);
    expect(btn1.style.visibility).toBe('visible');
    expect(btn2.style.visibility).toBe('visible');
  });
  it('should make disappear buttons from the screen when mouse leaves carousel', () => {
    deContainer.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(comp.hide).toBe(true);
    expect(btn1.style.visibility).toBe('hidden');
    expect(btn2.style.visibility).toBe('hidden');
  });
  it('should call leftClick() when button with id lftBtn is clicked', () => {
    const spy = spyOn(comp, 'leftClick');
    // de for left button
    deBtns[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should call rightClick() when button with id rtBtn is clicked', () => {
    const spy = spyOn(comp, 'rightClick');
    // de for right button
    deBtns[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it(`should be so that src of the image is numOfCurrImg of images array
     when button with id rtBtn is clicked`, () => {
      // de for right button
      deBtns[1].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(image.attributes[3].value)
        .toBe(comp.images[comp.numOfCurrImg].src);
    });
  it(`should be so that src of the image is numOfCurrImg of images array
     when button with id lftBtn is clicked`, () => {
      // de for left button
      deBtns[0].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(image.attributes[3].value)
        .toBe(comp.images[comp.numOfCurrImg].src);
    });

  describe('leftClick', () => {
    it(`should assign to numOfCurrImg a number of the last element in images
     array if numOfCurrImg equals 0`, () => {
        comp.numOfCurrImg = 0;
        comp.leftClick();
        fixture.detectChanges();
        expect(comp.numOfCurrImg).toBe(comp.images.length - 1);
      });
    it('should decrement numOfCurrImg if numOfCurrImg != 0', () => {
      comp.numOfCurrImg = 4;
      comp.leftClick();
      fixture.detectChanges();
      expect(comp.numOfCurrImg).toBe(3);
    });
  });
  describe('rightClick', () => {
    it(`should assign (the number of
    the first photo in images array) to numOfCurrImg
    if numOfCurrImg = the last element in images array`, () => {
        comp.numOfCurrImg = comp.images.length - 1;
        comp.rightClick();
        fixture.detectChanges();
        expect(comp.numOfCurrImg).toBe(0);
      });
    it(`should increment numOfCurrImg if numOfCurrImg != number
    of the last element in images array`, () => {
        comp.numOfCurrImg = 2;
        comp.rightClick();
        fixture.detectChanges();
        expect(comp.numOfCurrImg).toBe(3);
      });
  });

});
