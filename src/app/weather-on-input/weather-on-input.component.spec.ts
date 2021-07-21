import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherOnInputComponent } from './weather-on-input.component';

describe('WeatherOnInputComponent', () => {
  let component: WeatherOnInputComponent;
  let fixture: ComponentFixture<WeatherOnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherOnInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherOnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
