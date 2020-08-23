export class HtmlRadioButton {
    constructor(
        public Value?: string,
        public Text?: string,
        public Align?: any,
        public Disabled?: any,
        public NgChange?: any
    ) {
        this.NgChange = NgChange ? NgChange : function () { };
        this.Disabled = Disabled ? Disabled : function () { return false };
        this.Align = Align ? Align : 'side';
    }
}
