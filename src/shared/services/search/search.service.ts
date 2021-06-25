import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SuggestType {
  kind: string,
  url: any,
  queries: any,
  searchInformation: any,
  spelling: {
    "correctedQuery": string,
    "htmlCorrectedQuery": string
  }
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(
    private httpClient: HttpClient
  ) {
    
  }

  getSearch(key: string, cx: string, q: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('key', key);
    params = params.append('cx', cx);
    params = params.append('q', q);
    return this.httpClient.get('https://www.googleapis.com/customsearch/v1', {params: params}).pipe(map(res => {
      return res;
    }));
  }

  getSuggestion(key: string, cx: string, q: string): Observable<SuggestType> {
    console.log(q);
    return this.httpClient.get<SuggestType>(`https://www.googleapis.com/customsearch/v1/?key=${key}&cx=${cx}&q=${q}/suggest`).pipe(map(res => {
      console.log(res);
      return res;
    }));
  }
}
