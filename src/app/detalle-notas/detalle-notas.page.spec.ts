import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleNotasPage } from './detalle-notas.page';

describe('DetalleNotasPage', () => {
  let component: DetalleNotasPage;
  let fixture: ComponentFixture<DetalleNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
