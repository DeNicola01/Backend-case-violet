import { DomainEvent } from './domain-event';
import { FarmerId } from '../value-objects/farmer-id.vo';
import { CPF } from '../value-objects/cpf.vo';

export class FarmerCreatedEvent extends DomainEvent {
  constructor(
    public readonly farmerId: FarmerId,
    public readonly cpf: CPF,
  ) {
    super();
  }
}
