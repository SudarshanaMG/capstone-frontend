import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLoginComponent } from './contractor-login.component';

describe('ContractorLoginComponent', () => {
  let component: ContractorLoginComponent;
  let fixture: ComponentFixture<ContractorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
