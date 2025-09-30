import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  addressForm!: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param);
      },
    });
    this.initForm();
  }

  initForm() {
    this.addressForm = this.fb.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
}
