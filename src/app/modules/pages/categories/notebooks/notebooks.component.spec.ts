import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotebooksComponent } from './notebooks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import {DataService} from "../../../../core/services/data/data.service";
import {ProductsResponse} from "../../../../shared/models/products";

describe('NotebooksComponent', () => {
  let component: NotebooksComponent;
  let fixture: ComponentFixture<NotebooksComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NotebooksComponent // Importar el componente autónomo en lugar de declararlo
      ],
      providers: [DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotebooksComponent);
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
      notebooks: [
        {
          name: 'Notebook 1',
          price: 1000,
          discount: 100,
          description: 'Description of Notebook 1',
          image: 'notebook1.jpg',
          category: 'Notebooks',
          originalPrice: 1100,
          rating: 4.6,
          reviews: 200
        },
        {
          name: 'Notebook 2',
          price: 1500,
          discount: 150,
          description: 'Description of Notebook 2',
          image: 'notebook2.jpg',
          category: 'Notebooks',
          originalPrice: 1650,
          rating: 4.9,
          reviews: 250
        }
      ],
      cellPhones: [],
      airConditioning: [],
      outstanding: []
    };
    spyOn(dataService, 'getProducts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.products).toEqual(mockResponse.notebooks);
  });
});
