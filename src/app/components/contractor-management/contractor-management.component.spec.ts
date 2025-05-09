import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorManagementComponent } from './contractor-management.component';

describe('ContractorManagementComponent', () => {
  let component: ContractorManagementComponent;
  let fixture: ComponentFixture<ContractorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
