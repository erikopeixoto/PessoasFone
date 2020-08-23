import { Util } from './../../utils/util';
import { ValidatorFn } from '@angular/forms';
import { HtmlOption } from './html-option';

import { HtmlRadioButton } from './html-radiobutton';
import { HtmlDropButton } from './html-dropbutton';

export class HtmlElement {

    public Name?: string;
    public DataAscas?: string;
    public Label?: string;
    public Class?: string;
    public Component?: string;
    public Value?: any;
    public Type?: string;
    public Style?: any;
    public Width?: string;
    public Align?: string;
    public MaxLength?: string;
    public Validators?: ValidatorFn;
    public ReadOnly?: any;
    public Disabled?: any;
    public NgIf?: any;
    public NgChange?: any;
    public NgKeyUp?: any;
    public NgMask?: any;
    public NgClick?: any;
    public OnBlur?: any;
    public Icon?: string;
    public Select?: HtmlOption[];
    public DropButton?: HtmlDropButton[];
    public RadioButton?: HtmlRadioButton[];
    public SelectSelecione?: boolean;
    public SelectAmbos = false;
    public Contexto: any;
    public SelectTodos = false;
    public Sort?: any;

    constructor(

    ) {
        this.NgIf = () => { return true };
        this.NgKeyUp = () => { };
        this.NgChange = () => { };
        this.NgClick = (contexto) => { };
        this.ReadOnly = () => { return false };
        this.Disabled = () => { return false };
        this.OnBlur = () => { };
        this.Value = '';
        this.Label = '';
        this.Style = {};
        this.SelectSelecione = true;
        this.NgMask = { mask: false };
        this.Align = 'side-break';
        this.Select = new Array<HtmlOption>();
        this.DropButton = new Array<HtmlDropButton>();
        this.RadioButton = new Array<HtmlRadioButton>();
        this.Sort = () => { return true };
    }

    get JsValue(): string {
      if (this.Type !== 'datepicker' && this.Type !== 'date') {
        return this.Value;
      }
      return Util.inverterToString(this.Value) ;
    }
}
