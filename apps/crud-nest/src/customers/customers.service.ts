/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customersRepository.create(createCustomerDto);
    const sendResponse = this.client.send<{ type: string; data: BaseEntity }>('new_created', {
      type: 'customer',
      data: customer,
    });

    sendResponse.subscribe(async (response) => {
      console.log('Respuesta del microservicio:', response);
    });

    return await this.customersRepository.save(customer);
  }

  async findAll() {
    return await this.customersRepository.find();
  }

  async findOne(id: number) {
    return await this.customersRepository.findOneBy({ id });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customersRepository.update(id, updateCustomerDto);
  }

  async remove(id: number) {
    return await this.customersRepository.softDelete(id);
  }
}
