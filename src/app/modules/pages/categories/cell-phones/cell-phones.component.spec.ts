import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellPhonesComponent } from './cell-phones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import {DataService} from "../../../../core/services/data/data.service";
import {ProductsResponse} from "../../../../shared/models/products";


describe('CellPhonesComponent', () => {
  let component: CellPhonesComponent;
  let fixture: ComponentFixture<CellPhonesComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CellPhonesComponent // Importar el componente autónomo en lugar de declararlo
      ],
      providers: [DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CellPhonesComponent);
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
      coffeeMakers: [],
      notebooks: [],
      cellPhones: [
        {
          name: 'Cell Phone 1',
          price: 600,
          discount: 50,
          description: 'Description of Cell Phone 1',
          image: 'cellphone1.jpg',
          category: 'CellPhones',
          originalPrice: 650,
          rating: 4.2,
          reviews: 150
        },
        {
          name: 'Cell Phone 2',
          price: 800,
          discount: 75,
          description: 'Description of Cell Phone 2',
          image: 'cellphone2.jpg',
          category: 'CellPhones',
          originalPrice: 875,
          rating: 4.8,
          reviews: 300
        }
      ],
      airConditioning: [],
      outstanding: []
    };
    spyOn(dataService, 'getProducts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.products).toEqual(mockResponse.cellPhones);
  });
});
