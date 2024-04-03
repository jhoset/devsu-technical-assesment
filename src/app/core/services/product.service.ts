import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ProductDto {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: Date,
    date_revision: Date
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

    constructor(private _http: HttpClient) {
    }

    private getDefaultHeaders(): HttpHeaders {
        return new HttpHeaders({
            'authorId': 189
        })
    }

    getProducts(): Observable<ProductDto[]> {
        return this._http.get<ProductDto[]>(this.apiUrl, {headers: this.getDefaultHeaders()});
    }

    verifyExistingID(id: string): Observable<boolean> {
        const params = new HttpParams().set('id', id);
        return this._http.get<boolean>(this.apiUrl + '/verification', {headers: this.getDefaultHeaders(), params})
    }

    addProduct(product: ProductDto): Observable<ProductDto> {
        return this._http.post<ProductDto>(this.apiUrl, product, {headers: this.getDefaultHeaders()});
    }

    updateProduct(product: ProductDto): Observable<ProductDto> {
        return this._http.put<any>(this.apiUrl, product, {headers: this.getDefaultHeaders()});
    }


}
