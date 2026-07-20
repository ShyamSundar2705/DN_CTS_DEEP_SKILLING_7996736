import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Course } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  // Shared cache: every component reading courses$ sees the same live data,
  // so an add/update/delete anywhere is reflected everywhere without re-fetching.
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => this.coursesSubject.next(courses)),
      catchError(error => this.handleError(error))
    );
  }

  searchCourses(term: string): Observable<Course[]> {
    const params = term ? new HttpParams().set('name_like', term) : undefined;
    return this.http.get<Course[]>(this.apiUrl, { params }).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(created => this.coursesSubject.next([...this.coursesSubject.value, created])),
      catchError(error => this.handleError(error))
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      tap(updated => this.coursesSubject.next(
        this.coursesSubject.value.map(c => c.id === updated.id ? updated : c)
      )),
      catchError(error => this.handleError(error))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.coursesSubject.next(this.coursesSubject.value.filter(c => c.id !== id))),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('CourseService request failed:', error.message);
    return throwError(() => new Error('Something went wrong while contacting the course service.'));
  }
}
