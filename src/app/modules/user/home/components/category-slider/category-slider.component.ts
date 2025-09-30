import { CategoriesService } from './../../../../../core/services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { sliderOptions } from '../../../../../shared/helpers/slider-options';
import { Category } from '../../../../../core/models/category.interface';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css',
})
export class CategorySliderComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoriesSliderOptions: OwlOptions = sliderOptions(true);
  categories: Category[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
    });
  }
}
