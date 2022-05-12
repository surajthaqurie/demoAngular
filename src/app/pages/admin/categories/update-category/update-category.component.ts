import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/@core/services/category.services';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit, OnChanges {
  constructor(
    public categoryService: CategoryService,
    public $router: Router
  ) {}

  @Input() categoryId: string = '';
  @Output() categoryUpdateData: EventEmitter<any> = new EventEmitter();
  @Output() closeUpdate: EventEmitter<any> = new EventEmitter();

  category: any;
  errorMessage: string = '';
  successMessage: string = '';
  errTitle: string = '';
  errDescription: string = '';
  showOptions: boolean = true;

  ngOnInit(): void {}
  ngOnChanges(): void {
    // console.log('------id Check------------', this.categoryId);
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (result: any) => {
        // console.log('------------', result);
        this.category = result.category;
      },
    });
  }
  updateCategory(categoryUpdateData: NgForm) {
    if (categoryUpdateData.invalid) {
      return;
    }

    this.categoryService
      .updateCategory(this.categoryId, categoryUpdateData.value)
      .subscribe({
        next: (result: any) => {
          // console.log('-------category------------result', result);

          this.successMessage = result.msg;

          this.categoryUpdateData.emit(result.category);

          setTimeout(() => {
            // window.location.reload();
            this.successMessage = '';

            categoryUpdateData.resetForm();
            this.$router.parseUrl('/admin/dashboard');
          }, 1000);
        },
        error: (err) => {
          // console.log('--------------category-----error', err.error);
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
  closeUpdateForm() {
    this.closeUpdate.emit(false);
  }
}
