export class MaskManager {

    public static CPF = { mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] };
    public static DDD = { mask: [/[0-9]/, /[0-9]/] };
    public static DDI = { mask: [/[0-9]/, /\d/, /\d/, /\d/] };
    public static telefone = { mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
    public static CELULAR = { mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
    public static DDDtelefone = { mask: ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
    public static DDDfax = { mask: ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
    public static DDDcelular = { mask: ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
    public static CEP = { mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/] };
    public static DATA = { mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] };
    public static MesAno = { mask: [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] };
    public static CNPJBase = { mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/] };
    public static CPFBase = { mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/] };
    public static CNPJ = { mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/] };

    public static getNumberRegex(len): any {
        const n = [];
        for (let i = 0; i < len; i++) {
            n.push(/[A0-9]/);
        }
        return {mask: n, guide: false};
    }

    public static getStringRegex(len): any {
        const n = [];
        for (let i = 0; i < len; i++) {
            n.push(/[A-Za-z0-9 ]/);
        }
        return {mask: n, guide: false};
    }

    public static NUMBER = MaskManager.getNumberRegex(50);

}
