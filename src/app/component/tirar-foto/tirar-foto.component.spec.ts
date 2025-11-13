import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirarFotoComponent } from './tirar-foto.component';

describe('TirarFotoComponent', () => {
  let component: TirarFotoComponent;
  let fixture: ComponentFixture<TirarFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirarFotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
