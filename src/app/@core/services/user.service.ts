import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  public URL = 'http://localhost:4001/api/v1/users';

  getCurrentUser() {
    return this.http.get(`${this.URL}/me`);
  }
  getAllUser() {
    return this.http.get(`${this.URL}`);
  }
  getUserById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  updateUserProfile(updateData: any, file: any) {
    const formData = new FormData();
    formData.append('firstName', updateData.firstName);
    formData.append('lastName', updateData.lastName);
    formData.append('email', updateData.email);
    formData.append('contactNo', updateData.contactNo);
    formData.append('address', updateData.address);
    formData.append('street', updateData.street);
    formData.append('city', updateData.city);
    formData.append('country', updateData.country);
    formData.append('zipCode', updateData.zipCode);
    formData.append('file', file);

    return this.http.put(`${this.URL}`, formData);
  }

  updateUserPassword(updatePasswordData: any) {
    return this.http.patch(`${this.URL}`, updatePasswordData);
  }

  adminDeleteUser(userId: string) {
    return this.http.delete(`${this.URL}/${userId}`);
  }
}
