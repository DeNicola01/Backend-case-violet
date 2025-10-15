import { FarmerId } from '../value-objects/farmer-id.vo';
import { Name } from '../value-objects/name.vo';
import { CPF } from '../value-objects/cpf.vo';
import { Phone } from '../value-objects/phone.vo';
import { DomainEvent } from '../events/domain-event';
import { FarmerCreatedEvent } from '../events/farmer-created.event';
import { FarmerUpdatedEvent } from '../events/farmer-updated.event';
import { FarmerDeactivatedEvent } from '../events/farmer-deactivated.event';

export class Farmer {
  private readonly _id: FarmerId;
  private _name: Name;
  private readonly _cpf: CPF;
  private _birthDate?: Date;
  private _phone: Phone;
  private _isActive: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _domainEvents: DomainEvent[] = [];

  constructor(
    id: FarmerId,
    name: Name,
    cpf: CPF,
    birthDate: Date | undefined,
    phone: Phone,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._name = name;
    this._cpf = cpf;
    this._birthDate = birthDate;
    this._phone = phone;
    this._isActive = isActive;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): FarmerId {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get cpf(): CPF {
    return this._cpf;
  }

  get birthDate(): Date | undefined {
    return this._birthDate;
  }

  get phone(): Phone {
    return this._phone;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  // Business methods
  updateName(name: Name): void {
    if (this._name.equals(name)) {
      return;
    }
    this._name = name;
    this._updatedAt = new Date();
    this.addDomainEvent(new FarmerUpdatedEvent(this._id, 'name'));
  }

  updateBirthDate(birthDate: Date | undefined): void {
    if (this._birthDate?.getTime() === birthDate?.getTime()) {
      return;
    }
    this._birthDate = birthDate;
    this._updatedAt = new Date();
    this.addDomainEvent(new FarmerUpdatedEvent(this._id, 'birthDate'));
  }

  updatePhone(phone: Phone): void {
    if (this._phone.equals(phone)) {
      return;
    }
    this._phone = phone;
    this._updatedAt = new Date();
    this.addDomainEvent(new FarmerUpdatedEvent(this._id, 'phone'));
  }

  activate(): void {
    if (this._isActive) {
      return;
    }
    this._isActive = true;
    this._updatedAt = new Date();
    this.addDomainEvent(new FarmerUpdatedEvent(this._id, 'isActive'));
  }

  deactivate(): void {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    this._updatedAt = new Date();
    this.addDomainEvent(new FarmerDeactivatedEvent(this._id));
  }

  canBeDeleted(): boolean {
    return !this._isActive;
  }

  private addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  // Factory method
  static create(
    id: FarmerId,
    name: Name,
    cpf: CPF,
    birthDate?: Date,
    phone?: Phone,
    isActive: boolean = true,
  ): Farmer {
    const now = new Date();
    const farmer = new Farmer(
      id,
      name,
      cpf,
      birthDate,
      phone || new Phone(),
      isActive,
      now,
      now,
    );

    farmer.addDomainEvent(new FarmerCreatedEvent(id, cpf));
    return farmer;
  }
}
