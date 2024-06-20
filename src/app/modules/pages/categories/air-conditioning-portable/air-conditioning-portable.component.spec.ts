import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditioningPortableComponent } from './air-conditioning-portable.component';

describe('AirConditioningPortableComponent', () => {
  let component: AirConditioningPortableComponent;
  let fixture: ComponentFixture<AirConditioningPortableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirConditioningPortableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirConditioningPortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
