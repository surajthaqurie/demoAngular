import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  public URL = 'http://localhost:4001/api/v1/permission';
  constructor(public $http: HttpClient) {}

  getAllPermission() {
    return this.$http.get(`${this.URL}`);
  }

  getAllResources() {
    return this.$http.get(`${this.URL}/resources`);
  }

  setResourcePermission(resourceId: string, permissionData: any) {
    return this.$http.post(`${this.URL}/set/${resourceId}`, permissionData);
  }

  getEmployeePermission(employeeId: string) {
    return this.$http.get(`${this.URL}/emp/${employeeId}`);
  }
}
