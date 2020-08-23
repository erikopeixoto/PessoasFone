import { TypeMessage } from '../shared/constantes/type-message-enum';

export class ModalMessage {
    constructor(
        public title: string,
        public message: string,
        public typeInt: TypeMessage,
        public type: string,
    ) { }
}
