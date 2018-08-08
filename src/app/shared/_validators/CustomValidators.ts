import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static vaildEmail(c: FormControl): ValidationErrors {

        const email = c.value;
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var isValid = true;
        const message = {
            'vaildEmail': {'message': 'Should be valid email.'}
        };

        if (reg.test(email)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static ageValidate(c: FormControl): ValidationErrors {
       
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 18 && num <= 85;
        const message = {
            'validAge': {
                'message': 'The age must be a valid number between 18 and 85' // Will changes the error defined in errors helper.
            }
        };
        return isValid ? null : message;
    }

    static vaildDecimal(c: FormControl): ValidationErrors {

        const decimal = c.value;
        var reg = /^[0-9]\d{0,9}(\.\d{2})?%?$/
        var isValid = true;
        const message = {
            'vaildDecimal': {'message': 'Should be valid decimal upto 2 places.'}
        };

        if (reg.test(decimal)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }


}

