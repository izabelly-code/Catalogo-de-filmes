import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaFilmesComponent } from './busca-filmes.component';

describe('BuscaFilmesComponent', () => {
  let component: BuscaFilmesComponent;
  let fixture: ComponentFixture<BuscaFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaFilmesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
