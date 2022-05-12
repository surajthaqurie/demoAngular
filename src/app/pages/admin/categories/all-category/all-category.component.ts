import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from 'src/app/@core/services/category.services';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
})
export class AllCategoryComponent implements OnInit, OnChanges {
  constructor(public categoryService: CategoryService) {}

  @Input() newCategoryData: any;
  @Input() updateCategoryData: any;

  @Output() categoryId: EventEmitter<any> = new EventEmitter();
  @Output() showUpdateForm: EventEmitter<any> = new EventEmitter();

  categories: any;
  errorMessage: string = 'Loading...';
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (result: any) => {
        // console.log(result);
        this.categories = result.category;
      },
    });
  }
  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (result: any) => {
        // console.log(result);

        if (result.success) {
          return this.listAfterDelete(id);
        }
      },
    });
  }

  listAfterDelete(id: string) {
    this.categories = this.categories.filter(
      (category: any) => category._id !== id
    );
  }
  // listAfterAdd
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('**************************', changes);
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^', changes['newCategoryData']);
    if (changes['newCategoryData'] && !changes['newCategoryData'].firstChange) {
      this.categoryService
        .getCategoryById(changes['newCategoryData'].currentValue._id)
        .subscribe({
          next: (result: any) => {
            // console.log('From on change', result);
            this.categories.push(result.category);
          },
        });
    }
    // showUpdateForm
    // console.log('^^^^^^^^^^^^^^^^', changes['updateCategoryData']);
    if (
      changes['updateCategoryData'] &&
      !changes['updateCategoryData'].firstChange
    ) {
      this.categoryService
        .getCategoryById(changes['updateCategoryData'].currentValue._id)
        .subscribe({
          next: (result: any) => {
            if (result.success) {
              this.listAfterDelete(result.category._id);
              this.categories.push(result.category);
            }
          },
        });
    }
  }
  updateCategory(id: string) {
    this.categoryId.emit(id);
    this.showUpdateForm.emit(true);
  }
}
