import { Util } from '../../utils/util';

export class HtmlDropButton {
    constructor(
        public Label?: string,
        public Click?: any,
        public Icon?: string,
        public Disabled?: Function,
    ) {
        this.Disabled = Disabled != null ? Disabled : Util.falseFunc;
    }
}
