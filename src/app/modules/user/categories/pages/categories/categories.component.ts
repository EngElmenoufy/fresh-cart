import { Component, inject } from '@angular/core';
import { Category } from '../../../../../core/models/category.interface';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { MainHeaderComponent } from '../../../../../shared/components/main-header/main-header.component';
import { ResponsiveComponent } from '../../../../../shared/components/responsive/responsive.component';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent, MainHeaderComponent, ResponsiveComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categories: Category[] = [];

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  onGetSubtitle(categoryId: string) {
    this.categoriesService
      .getAllSubCategoriesOnCategory(categoryId)
      .subscribe();
  }
}
