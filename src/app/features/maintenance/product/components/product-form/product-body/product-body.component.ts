import { Component, effect, inject, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateProductDto, UpdateProductDto } from '@features/maintenance/product/models';
import { CustomInputComponent } from '@shared/components';
import { RegexPatterns } from '@shared/constants';
import { ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-body',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, MatInputModule],
  templateUrl: './product-body.component.html',
  styles: ``
})
export class ProductBodyComponent {

  private readonly fb = inject(FormBuilder)
  code = model<string>('')
  isCreate = model<boolean>(true)
  product = model.required<CreateProductDto | UpdateProductDto>()
  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(RegexPatterns.TEXT_ONLY)]],
    name: ['', [Validators.required, Validators.pattern(RegexPatterns.TEXT_ONLY)]],
  })
  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const product: UpdateProductDto = this.product()
    if (!product || ValidatorUtil.isObjectEmpty(product as any)) return

    this.form.patchValue({
      code: this.code(),
      name: product.name,
    })
    this.updateFormValuesEffect.destroy()
  })
  private updateCodeStatusEffect = effect(() => {
    if (this.isCreate()) return

    this.form.get('code')!.disable()
    this.updateCodeStatusEffect.destroy()
  })
  ngOnInit() {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      if ('code' in this.product()) {
        this.product.update(cur => ({
          ...cur,
          code: this.form.get('code')!.value ?? '',
          name: this.form.get('name')!.value ?? '',
        }))
        return
      }

      this.product.update(cur => ({
        ...cur,
        name: this.form.get('name')!.value ?? '',
      }))
    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }
}
