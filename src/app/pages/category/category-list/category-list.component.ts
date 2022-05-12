import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/@core/services/category.services';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  category: any

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): any {

    return this.categoryService.getAllCategory().subscribe({
      next: (result: any) => {
        // console.log(result)
        this.category = result.category;
      },
      error: (err) => { /* console.log("-------------", err) */ }

    });

  }
  
}
