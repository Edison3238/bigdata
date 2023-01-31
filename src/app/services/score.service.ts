import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ociosa {

  API_URL = 'http://a277731c-c253-4def-a240-5b3e606b80f3.westus.azurecontainer.io/score';

  constructor(private http: HttpClient) { }

  postData(data:Data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Data>('http://a277731c-c253-4def-a240-5b3e606b80f3.westus.azurecontainer.io/score', data, httpOptions);
   }
  }

  /*getSkills(id){
    return this.http.get<any>(this.URL + 'experience/'+id)
    .pipe(map((res: any)=> res.experienceDetail))
  }
*/




