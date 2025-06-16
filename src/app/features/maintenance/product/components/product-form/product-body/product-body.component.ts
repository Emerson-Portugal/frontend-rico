import { Component, effect, inject, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateProductDto, UpdateProductDto } from '@features/maintenance/product/models';
import { RegexPatterns } from '@shared/constants';
import { EnumUtil, ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';
import { CustomInputComponent, CustomSelectComponent } from '@shared/components'
import { ProductTypeEnum } from '@features/maintenance/product/constants'


@Component({
  selector: 'app-product-body',
  standalone: true,
  imports: [CustomInputComponent, CustomSelectComponent, ReactiveFormsModule, MatInputModule],
  templateUrl: './product-body.component.html',
  styles: ``
})
export class ProductBodyComponent {


  productTypeEnum = EnumUtil.toCustomSelectContent(ProductTypeEnum)


  private readonly fb = inject(FormBuilder)
  code = model<string>('')
  isCreate = model<boolean>(true)
  product = model.required<CreateProductDto | UpdateProductDto>()
  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(RegexPatterns.TEXT_ONLY)]],
    name: ['', [Validators.required, Validators.pattern(RegexPatterns.TEXT_ONLY)]],
    day: [0, [Validators.required, Validators.pattern(RegexPatterns.ALPHA_NUMERIC)]],
    type: ['', [Validators.required]],
  })
  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const product: UpdateProductDto = this.product()
    if (!product || ValidatorUtil.isObjectEmpty(product as any)) return

    this.form.patchValue({
      code: this.code(),
      name: product.name,
      day: product.day,
      type: product.type,
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
          live: this.form.get('live')!.value ?? 0,
          type: this.form.get('type')!.value ?? '',
        }))
        return
      }

      this.product.update(cur => ({
        ...cur,
        name: this.form.get('name')!.value ?? '',
        live: this.form.get('live')!.value ?? 0,
        type: this.form.get('type')!.value ?? '',
      }))
    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }
}
