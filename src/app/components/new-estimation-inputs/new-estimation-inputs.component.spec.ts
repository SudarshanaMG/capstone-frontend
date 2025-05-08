import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEstimationInputsComponent } from './new-estimation-inputs.component';

describe('NewEstimationInputsComponent', () => {
  let component: NewEstimationInputsComponent;
  let fixture: ComponentFixture<NewEstimationInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEstimationInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEstimationInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
