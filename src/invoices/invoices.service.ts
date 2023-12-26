import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const invoice = this.invoicesRepository.create(createInvoiceDto);
    return await this.invoicesRepository.save(invoice);
  }

  async findAll() {
    return this.invoicesRepository.find();
  }

  async findOne(id: number) {
    return await this.invoicesRepository.findOneBy({ id });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoicesRepository.update(id, updateInvoiceDto);
  }

  async remove(id: number) {
    return await this.invoicesRepository.softDelete(id);
  }
}
