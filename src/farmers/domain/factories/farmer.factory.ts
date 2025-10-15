import { Farmer } from '../entities/farmer.entity';
import { FarmerId } from '../value-objects/farmer-id.vo';
import { Name } from '../value-objects/name.vo';
import { CPF } from '../value-objects/cpf.vo';
import { Phone } from '../value-objects/phone.vo';

export interface CreateFarmerData {
  name: string;
  cpf: string;
  birthDate?: string;
  phone?: string;
  isActive?: boolean;
}

export interface UpdateFarmerData {
  name?: string;
  birthDate?: string;
  phone?: string;
  isActive?: boolean;
}

export class FarmerFactory {
  static create(data: CreateFarmerData, id?: string): Farmer {
    const farmerId = id ? new FarmerId(id) : FarmerId.generate();
    const name = new Name(data.name);
    const cpf = new CPF(data.cpf);
    const phone = data.phone ? new Phone(data.phone) : new Phone();
    const birthDate = data.birthDate ? new Date(data.birthDate) : undefined;
    const isActive = data.isActive ?? true;

    return Farmer.create(farmerId, name, cpf, birthDate, phone, isActive);
  }

  static update(farmer: Farmer, data: UpdateFarmerData): Farmer {
    if (data.name !== undefined) {
      farmer.updateName(new Name(data.name));
    }

    if (data.birthDate !== undefined) {
      const birthDate = data.birthDate ? new Date(data.birthDate) : undefined;
      farmer.updateBirthDate(birthDate);
    }

    if (data.phone !== undefined) {
      farmer.updatePhone(new Phone(data.phone));
    }

    if (data.isActive !== undefined) {
      if (data.isActive) {
        farmer.activate();
      } else {
        farmer.deactivate();
      }
    }

    return farmer;
  }
}
