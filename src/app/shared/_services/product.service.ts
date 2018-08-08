import { Injectable } from '@angular/core';
import { Product } from './../_models/product';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { constants } from './../../../assets/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpUrl = constants.APIServer + "/products";
  constructor(private http: Http) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get(this.httpUrl)
      .map(this.extractData)
      .catch(this.handleError)
      ;
  }

  getProductById(productId: string): Observable<Product> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.httpUrl + "/" + productId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createProduct(product: Product): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    const formData: any = new FormData();
  //  const productImagesfiles: Array<File> = product.ProductImageFiles;
    const productIBannerfile: File = product.ProductBannerFile;
    
    // for (let i = 0; i < product.ProductImageFiles.length; i++) {
    //   formData.append("uploads[]", productImagesfiles[i], productImagesfiles[i]['name']);
    // }
    formData.append("product", JSON.stringify(product));
    if (productIBannerfile!=null)
    {
      formData.append("banner", productIBannerfile, productIBannerfile['name']);
      product.ProductIconURL = productIBannerfile.name;
    }
    return this.http.post(this.httpUrl, formData)
      .map(files => files.json())
      .catch(this.handleError);
  }

  updateProduct(product: Product): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });;
    return this.http.put(this.httpUrl + "/" + product.Id, product, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  deleteProductById(productId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.httpUrl + "/" + productId)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response) {
    console.error(error || error);
    return Observable.throw(error.status);
  }

}
