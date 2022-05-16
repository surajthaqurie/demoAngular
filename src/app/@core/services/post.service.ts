import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public URL = 'http://localhost:4001/api/v1/post';
  public commentUrl = 'http://localhost:4001/api/v1/comment';

  constructor(public $http: HttpClient, public router: Router) {}

  createPost(postData: any) {
    return this.$http.post(`${this.URL}`, postData);
  }

  getAllPost() {
    return this.$http.get(`${this.URL}`);
  }

  getPostById(id: string) {
    // console.log('+++++++++++++++++====',id);
    return this.$http.get(`${this.URL}/${id}`);
  }
  getPostBySlug(slug: any) {
    return this.$http.get(`${this.URL}/slug/${slug}`);
  }

  getPostUnApprovedComment(slug: any) {
    return this.$http.get(`${this.URL}/slug/unapproved/${slug}`);
  }

  deletePost(id: string) {
    return this.$http.delete(`${this.URL}/${id}`);
  }

  // File Upload setup
  updatedPost(id: string, updateData: any, file: any) {
    const formData = new FormData();
    formData.append('title', updateData.title);
    formData.append('content', updateData.content);
    formData.append('category', updateData.category);
    formData.append('file', file);

    return this.$http.put(`${this.URL}/${id}`, formData);
  }

  /* mainly these are comment services */
  addPostComment(id: string, text: string) {
    return this.$http.post(`${this.commentUrl}/${id}`, text);
  }

  addReplyComment(id: string, text: string) {
    return this.$http.post(`${this.commentUrl}/reply/${id}`, text);
  }

  getCommentByd(id: string) {
    return this.$http.get(`${this.commentUrl}/${id}`);
  }

  makeCommentApproved(commentId: string) {
    return this.$http.patch(`${this.commentUrl}/${commentId}`, '');
  }
}
