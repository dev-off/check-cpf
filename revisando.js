

class validateCpf {
    constructor(sentCpf) {
        Object.defineProperty(this, 'cleanCpf', {
            enumerable: true,
            get: function () {
                return sentCpf.replace(/\D+/g, '');
            }
        });
    }
    validate() {
        if (typeof this.cleanCpf === undefined)
            return false;
        if (this.cleanCpf.length !== 11)
            return false;
        if (this.checkSequence())
            return false;
        const partialCpf = this.cleanCpf.slice(0, -2);
        const digitOne = this.createDigit(partialCpf);
        const digitTwo = this.createDigit(partialCpf + digitOne);

        const newCpf = partialCpf + digitOne + digitTwo;
        return newCpf === this.cleanCpf;
    }
    createDigit(partialCpf) {
        const cpfArray = Array.from(partialCpf);
        let regressive = cpfArray.length + 1;

        const total = cpfArray.reduce((ac, val) => {
            ac += (regressive * Number(val));
            regressive--;
            return ac;
        }, 0);

        const digit = 11 - (total % 11);
        return digit > 9 ? '0' : String(digit);
    }
    checkSequence() {
        const sequence = this.cleanCpf[0].repeat(this.cleanCpf.length);
        return sequence === this.cleanCpf;
    }
}



// data entry
const cpf = new validateCpf('705.484.450-52');

if(cpf.validate()){
    console.log('CPF is valid')
}else{
    console.log('CPF is not valid')
}