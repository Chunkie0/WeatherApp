import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationWeatherComponent } from './current-location-weather.component';

describe('CurrentLocationWeatherComponent', () => {
  let component: CurrentLocationWeatherComponent;
  let fixture: ComponentFixture<CurrentLocationWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentLocationWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
