import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) { } // creating/requesting http client

  uid?: number = 3;
  taskData?: any;

  url: string = 'https://todo-backend-ck5v.onrender.com/todo/';

  getTodo() {
    return this.http.get(this.url);
  }
  addTodo(data: any) {
    return this.http.post(this.url + 'add/', data.value);
  }
  editTodo(id: number, description: any) {
    return this.http.put(this.url + 'edit/' + id, description.value);
  }
  deleteTodo(id: number) {
    return this.http.delete(this.url + 'delete/' + id);
  }
}
