import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendAnalysisComponent } from './spend-analysis.component';

describe('SpendAnalysisComponent', () => {
  let component: SpendAnalysisComponent;
  let fixture: ComponentFixture<SpendAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
