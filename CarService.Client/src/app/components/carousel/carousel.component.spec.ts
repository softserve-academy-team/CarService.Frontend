import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { AboutComponent } from '../about/about.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

describe('BannerComponent (inline template)', () => {

    let comp: CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;
    let deBtns: DebugElement[];
    let deContainer: DebugElement;
    let btn1: HTMLElement;
    let btn2: HTMLElement;
    let carouselContainer: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CarouselComponent, AboutComponent ], // declare the test component
        imports: [MatCardModule, MatDividerModule]
      });
      fixture = TestBed.createComponent(CarouselComponent);
      comp = fixture.componentInstance; // BannerComponent test instance
      // query for the title <h1> by CSS element selector
      deBtns = fixture.debugElement.queryAll(By.css('button'));
      deContainer = fixture.debugElement.query(By.css('mat-card'));
      btn1 = deBtns[0].nativeElement;
      btn2 = deBtns[1].nativeElement;
      carouselContainer = deContainer.nativeElement;
      fixture.detectChanges();
    });
    it('should appear on the screen when carousel is being hovered over', () => {
      deContainer.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();
      expect(comp.hide).toBe(false);
      console.log('hide =', comp.hide);
      expect(btn1.style.visibility).toBe('visible');
      console.log('(btn1.style.visibility=', btn1.style.visibility);
  });

});
