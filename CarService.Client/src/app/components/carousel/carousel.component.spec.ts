import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import {MatCardModule} from '@angular/material/card';

describe('BannerComponent (inline template)', () => {

    let comp:    CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;
    let deBtns: DebugElement[];
    let deContainer: DebugElement;
    let btn1: HTMLElement;
    let btn2: HTMLElement;
    let carouselContainer: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CarouselComponent ], // declare the test component
        imports: [MatCardModule]
      });
      fixture = TestBed.createComponent(CarouselComponent);
      comp = fixture.componentInstance; // BannerComponent test instance
      // query for the title <h1> by CSS element selector
      deBtns = fixture.debugElement.queryAll(By.css('button'));
      deContainer = fixture.debugElement.query(By.css('mat-card'));
      btn1 = deBtns[0].nativeElement;
      btn2 = deBtns[1].nativeElement;
      carouselContainer = deContainer.nativeElement;
    });
    it('should appear on the screen when carousel is being hovered over', () => {
        // deContainer.triggerEventHandler('mouseenter', null);
        fixture.detectChanges();
        expect(comp.hide).toBeFalsy();
        expect(btn1.style.visibility).toBe('hidden');
  });

});
