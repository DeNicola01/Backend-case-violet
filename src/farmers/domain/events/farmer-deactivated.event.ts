import { DomainEvent } from './domain-event';
import { FarmerId } from '../value-objects/farmer-id.vo';

export class FarmerDeactivatedEvent extends DomainEvent {
  constructor(
    public readonly farmerId: FarmerId,
  ) {
    super();
  }
}
