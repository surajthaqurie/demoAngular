import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public URL = 'http://localhost:4001/api/v1/category';
  constructor(public $http: HttpClient, public $router: Router) {}

  createCategory(categoryData: any) {
    return this.$http.post(`${this.URL}`, categoryData);
  }

  getAllCategory() {
    return this.$http.get(`${this.URL}`);
  }
  getCategoryById(id: string) {
    // console.log('-------------------', id);

    return this.$http.get(`${this.URL}/${id}`);
  }

  deleteCategory(id: string) {
    return this.$http.delete(`${this.URL}/${id}`);
  }

  updateCategory(id: string, updateData: any) {
    return this, this.$http.put(`${this.URL}/${id}`, updateData);
  }
}
