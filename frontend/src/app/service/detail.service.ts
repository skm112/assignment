import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }
  //@getData
  getdata(): Observable<any> {
    return this.http
      .get("http://localhost:3000/task/list")
      .pipe(map(response => response));
  }

  //@getSingleTask
  gettask(id: string): Observable<any> {
    return this.http
      .get("http://localhost:3000/task/task/" + id)
      .pipe(map(response => response));
  }

  //@saveData
  savedata(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/task/save", obj)
      .pipe(map(response => response));
  }

  //@updateData
  updatedata(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/task/update", obj)
      .pipe(map(response => response));
  }

  //@updateData
  updateStatus(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/task/status", obj)
      .pipe(map(response => response));
  }

  //@deleteData
  deletedata(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/task/delete/" + obj._id)
      .pipe(map(response => response));
  }
}
