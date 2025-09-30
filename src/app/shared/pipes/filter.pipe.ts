import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../modules/user/products/models/product.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Product[], search: string): Product[] {
    if (!search || !items || search.length <= 3) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
