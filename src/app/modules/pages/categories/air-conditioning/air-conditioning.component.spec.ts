import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import {AirConditioningComponent} from "./air-conditioning.component";
import {DataService} from "../../../../core/services/data/data.service";
import {ProductsResponse} from "../../../../shared/models/products";

describe('AirConditioningComponent', () => {
  let component: AirConditioningComponent;
  let fixture: ComponentFixture<AirConditioningComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AirConditioningComponent
      ],
      providers: [DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AirConditioningComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getProducts al inicializarse', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of({
      coffeeMakers: [],
      notebooks: [],
      cellPhones: [],
      airConditioning: [],
      outstanding: []
    }));
    component.ngOnInit();
    expect(dataService.getProducts).toHaveBeenCalled();
  });

  it('debería manejar los datos obtenidos de getData', () => {
    const mockResponse: ProductsResponse = {
      coffeeMakers: [
      ],
      notebooks: [],
      cellPhones: [],
      airConditioning: [
        {
          name: 'Air Conditioner 1',
          price: 200,
          discount: 20,
          description: 'Description of Air Conditioner 1',
          image: 'aircon1.jpg',
          category: 'AirConditioning',
          originalPrice: 220,
          rating: 4.3,
          reviews: 75
        },
        {
          name: 'Air Conditioner 2',
          price: 250,
          discount: 25,
          description: 'Description of Air Conditioner 2',
          image: 'aircon2.jpg',
          category: 'AirConditioning',
          originalPrice: 275,
          rating: 4.8,
          reviews: 120
        }
      ],
      outstanding: []
    };
    spyOn(dataService, 'getProducts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.products).toEqual(mockResponse.coffeeMakers);
  });
});


