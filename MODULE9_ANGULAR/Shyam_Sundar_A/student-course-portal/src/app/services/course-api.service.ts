import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Course } from '../models/course.model';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      // JSONPlaceholder only exposes 100 generic posts; a slice keeps the course grid readable
      map(posts => posts.slice(0, 10).map(post => this.toCourse(post))),
      catchError(error => this.handleError(error))
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      map(post => this.toCourse(post)),
      catchError(error => this.handleError(error))
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // JSONPlaceholder posts don't carry course data, so real GET responses are mapped onto the Course model
  private toCourse(post: Post): Course {
    const gradeStatuses: Course['gradeStatus'][] = ['passed', 'failed', 'pending'];
    return {
      id: post.id,
      name: post.title,
      code: `PST${post.id.toString().padStart(3, '0')}`,
      credits: (post.id % 4) + 1,
      gradeStatus: gradeStatuses[post.id % gradeStatuses.length],
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('CourseApiService request failed:', error.message);
    return throwError(() => new Error('Something went wrong while contacting the course API.'));
  }
}
