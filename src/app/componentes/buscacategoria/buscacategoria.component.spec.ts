import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscacategoriaComponent } from './buscacategoria.component';

describe('BuscacategoriaComponent', () => {
  let component: BuscacategoriaComponent;
  let fixture: ComponentFixture<BuscacategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscacategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
