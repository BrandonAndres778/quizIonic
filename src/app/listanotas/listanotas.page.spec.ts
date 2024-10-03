import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListanotasPage } from './listanotas.page';

describe('ListanotasPage', () => {
  let component: ListanotasPage;
  let fixture: ComponentFixture<ListanotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListanotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
