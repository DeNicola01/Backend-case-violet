import { DomainEvent } from './domain-event';
import { FarmerId } from '../value-objects/farmer-id.vo';

export class FarmerUpdatedEvent extends DomainEvent {
  constructor(
    public readonly farmerId: FarmerId,
    public readonly field: string,
  ) {
    super();
  }
}
