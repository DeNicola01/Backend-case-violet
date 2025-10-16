import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true; // Se não há valor, deixa outras validações tratarem
          
          const date = new Date(value);
          const today = new Date();
          today.setHours(23, 59, 59, 999); // Fim do dia atual
          
          return date <= today;
        },
        defaultMessage(args: ValidationArguments) {
          return 'A data de nascimento não pode ser no futuro';
        },
      },
    });
  };
}
