import { Injectable } from '@angular/core';
import { Category } from './../_models/category';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constants } from './../../../assets/constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  httpUrl = constants.APIServer+"/categories";
  constructor(private http: Http) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(this.httpUrl)
      .map(this.extractData)
      .catch(this.handleError)
      ;
  }

  getCategoryById(categoryId: string): Observable<Category> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.httpUrl + "/" + categoryId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createCategory(category: Category): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    const formData: any = new FormData();
    const files: Array<File> = category.Files;
    category.BannerURL=files[0].name;
    for (let i = 0; i < category.Files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    formData.append("category",JSON.stringify(category));
    return this.http.post(this.httpUrl,formData)
    .map(files => files.json())
      .catch(this.handleError);
  }

  updateCategory(category: Category): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });;
    return this.http.put(this.httpUrl + "/" + category.Id, category, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  deleteCategoryById(categoryId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.httpUrl + "/" + categoryId)
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
