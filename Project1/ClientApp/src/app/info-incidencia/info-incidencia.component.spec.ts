import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIncidenciaComponent } from './info-incidencia.component';

describe('InfoIncidenciaComponent', () => {
  let component: InfoIncidenciaComponent;
  let fixture: ComponentFixture<InfoIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoIncidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
