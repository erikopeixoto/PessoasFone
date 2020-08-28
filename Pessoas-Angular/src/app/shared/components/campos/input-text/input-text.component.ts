import { Component,
  OnInit,
  AfterContentChecked,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';
import { Util } from 'src/app/utils/util';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit, AfterContentChecked {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() class: string;
  @Input() style: string;
  @Input() maxLength: string;
  @Input() maskTexto: string;
  @Input() isDisabled: boolean;

  constructor(public validacao: ValidarCamposService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    this.isDisabled = false;
    this.maskTexto = '';

    setTimeout(() => {
      this.changeDetectorRef.markForCheck();
    }, 2000);
  }

  myModel: any;
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  ngOnInit(): void{
    // hello(this.maskTexto);
  }

  ngAfterContentChecked(): void {
    /*
    if (! Util.isNullOrEmpty(this.maskTexto)) {
       (function ($) {
         $(document).ready(function(){
           $('#inputTexto').mask('9999-9999');
         });
       })(jQuery);
       $(document).ready(function(){
        $('#inputTexto').mask('9999-9999');
      });
    }
    */
  }

  update(): void {
    this.changeDetectorRef.markForCheck();
  }
}
