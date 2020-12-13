import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FeatureToggle } from './feature-toggle';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {

  private featureUrl = 'http://localhost:8080/feature';  // URL to web api

  constructor(private http: HttpClient) { }

  getFeatureToggles(): Observable<FeatureToggle[]> {
    return this.http.get<FeatureToggle[]>(`${this.featureUrl}/list`).pipe(
      catchError(this.handleError<FeatureToggle[]>('getFeatureToggles', [])));
  }

  toggleFeature(name: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.featureUrl}/toggle/${name}`).pipe(
      catchError(this.handleError<Boolean>(`toggleFeature name=${name}`)));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
