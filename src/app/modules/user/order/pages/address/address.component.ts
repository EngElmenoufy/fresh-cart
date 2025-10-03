import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-address',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  addressForm!: FormGroup;
  cartId: string | undefined = undefined;
  isLoading = false;

  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (route: any) => {
        this.cartId = route.params.cartId;
      },
    });
  }

  initForm() {
    this.addressForm = this.fb.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // this.isLoading = true;
      this.orderService
        .createOrder(this.cartId!, this.addressForm.value)
        .subscribe({
          next: (res: any) => {
            window.open(res.session.url, '_self');
          },
        });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
