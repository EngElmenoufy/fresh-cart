import { Component, inject, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../../../../../shared/components/main-header/main-header.component';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { ResponsiveComponent } from '../../../../../shared/components/responsive/responsive.component';
import { ListCardComponent } from '../../components/brand-card/brand-card.component';
import { Brand } from '../../models/brand.interface';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [
    ModalComponent,
    MainHeaderComponent,
    ResponsiveComponent,
    ListCardComponent,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brands: Brand[] = [];
  selectedBrand: Brand | null = null;
  isOpenModel: boolean = false;

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res.data;
      },
    });
  }

  onBrandDetails(brandId: string) {
    this.brandsService.getSpecificBrand(brandId).subscribe({
      next: (res: any) => {
        this.selectedBrand = res.data;
      },
      complete: () => {
        this.isOpenModel = true;
      },
    });
  }
}
