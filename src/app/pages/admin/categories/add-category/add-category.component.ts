import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/@core/services/category.services';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    public categoryService: CategoryService,
    public $router: Router
  ) {}
  ngOnInit(): void {}

  @Output() categoryCreated: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  category: any;
  errorMessage: string = '';
  successMessage: string = '';
  errTitle: string = '';
  errDescription: string = '';

  addCategory(categoryData: NgForm) {
    if (!categoryData) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.errTitle = '';
    this.errDescription = '';

    this.categoryService.createCategory(categoryData.value).subscribe({
      next: (result: any) => {
        // console.log('----------category',result);
        this.successMessage = result.msg;

        this.categoryCreated.emit(result.category);
        setTimeout(() => {
          // window.location.reload();
          this.successMessage = '';

          categoryData.resetForm();
          this.$router.parseUrl('/admin/dashboard');
        }, 1000);
      },
      error: (err) => {
        // console.log(err);
        if (err.error.msg) {
          err.error.msg.includes('Unauthorized')
            ? (this.errorMessage = err.error.msg)
            : '';
          err.error.error.includes('Conflict')
            ? (this.errorMessage = err.error.msg)
            : '';

          err.error.msg[0].includes('title')
            ? (this.errTitle = err.error.msg[0])
            : '';

          err.error.msg[0].includes('description')
            ? (this.errDescription = err.error.msg[0])
            : '';
        } else {
          this.errorMessage =
            'Something went wrong please check your connection!!!';
        }
      },
    });
  }
  closeCreateForm(){
    this.closeForm.emit(false);
  }
}
