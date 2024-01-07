import { Inject, Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { BaseEntity, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) { }

  async create(CreateSellerDto: CreateSellerDto) {
    const seller = this.sellersRepository.create(CreateSellerDto);

    const sendResponse = this.client.send<{ type: string; data: BaseEntity }>(
      'new_created',
      {
        type: 'Seller',
        data: seller,
      },
    );

    sendResponse.subscribe(async (response) => {
      console.log('Respuesta del microservicio:', response);
    });
    return await this.sellersRepository.save(seller);
  }

  async findAll() {
    return await this.sellersRepository.find();
  }

  async findOne(id: number) {
    return await this.sellersRepository.findOneBy({ id });
  }

  async update(id: number, updateCustomerDto: UpdateSellerDto) {
    return await this.sellersRepository.update(id, updateCustomerDto);
  }

  async remove(id: number) {
    return await this.sellersRepository.softDelete(id);
  }
}
