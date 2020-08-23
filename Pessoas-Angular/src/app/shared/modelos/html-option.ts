import { Util } from '../../utils/util';

export class HtmlOption {
    constructor(
        public Value?: any,
        public Text?: string,
        public Disabled?: Function,
        public Object?: any
    ) {
        this.Disabled = Disabled != null ? Disabled : Util.falseFunc;
    }
}
