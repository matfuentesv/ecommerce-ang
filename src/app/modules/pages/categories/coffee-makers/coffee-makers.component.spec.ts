import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeMakersComponent } from './coffee-makers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import {DataService} from "../../../../core/services/data/data.service";
import {ProductsResponse} from "../../../../shared/models/products";


describe('CoffeeMakersComponent', () => {
  let component: CoffeeMakersComponent;
  let fixture: ComponentFixture<CoffeeMakersComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoffeeMakersComponent // Importar el componente autónomo en lugar de declararlo
      ],
      providers: [DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoffeeMakersComponent);
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
        {
          name: 'Coffee Maker 1',
          price: 100,
          discount: 10,
          description: 'Description 1',
          image: 'image1.jpg',
          category: 'Coffee',
          originalPrice: 110,
          rating: 4.5,
          reviews: 100
        },
        {
          name: 'Coffee Maker 2',
          price: 150,
          discount: 15,
          description: 'Description 2',
          image: 'image2.jpg',
          category: 'Coffee',
          originalPrice: 165,
          rating: 4.7,
          reviews: 150
        }
      ],
      notebooks: [],
      cellPhones: [],
      airConditioning: [],
      outstanding: []
    };
    spyOn(dataService, 'getProducts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.products).toEqual(mockResponse.coffeeMakers);
  });
});
