import { ShopParams } from './../shared/models/shop-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  basrUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams)
  {
    let params = new HttpParams();
    if (shopParams.brandId !== 0)
    {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0)
    {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search)
    {
      params = params.append('search', shopParams.search);
    }


    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.basrUrl + 'products', {observe: 'response', params})
    .pipe(
      map(
        response => {
          return response.body;
        }
      )
    );
  }
  getProduct(id: number)
  {
    return this.http.get<IProduct>(this.basrUrl + 'products/' + id);
  }
  getBrands()
  {
    return this.http.get<IProductBrand[]>(this.basrUrl + 'products/brands');
  }
  getTypes()
  {
    return this.http.get<IProductType[]>(this.basrUrl + 'products/types');
  }
}
