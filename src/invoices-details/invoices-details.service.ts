import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoicesDetailDto } from './dto/create-invoices-detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices-detail.dto';
import { InvoicesDetail } from './entities/invoices-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesDetailsService {
  constructor(
    @InjectRepository(InvoicesDetail)
    private invoiceDetailsRepository: Repository<InvoicesDetail>,

    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDetailDto: CreateInvoicesDetailDto) {
    const { invoiceId, ...validDto } = createInvoiceDetailDto;

    const invoice = await this.invoicesRepository.findOneBy({ id: invoiceId });

    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    const invoiceDetail = this.invoiceDetailsRepository.create({
      ...validDto,
      invoice,
    });
    return await this.invoiceDetailsRepository.save(invoiceDetail);
  }

  findAll() {
    return this.invoiceDetailsRepository.find({
      relations: {
        invoice: true,
      },
    });
  }

  findOne(id: number) {
    return this.invoiceDetailsRepository.findOne({
      where: { id: id },
      relations: {
        invoice: true,
      },
    });
  }

  async update(id: number, updateInvoiceDetailDto: UpdateInvoicesDetailDto) {
    const { invoiceId, ...validDto } = updateInvoiceDetailDto;

    const invoiceDetail = await this.invoiceDetailsRepository.findOneBy({ id });

    if (!invoiceDetail) {
      throw new BadRequestException('InvoicenDetail not found');
    }

    let invoice;
    if (invoiceId) {
      invoice = await this.invoicesRepository.findOneBy({
        id: invoiceId,
      });

      if (!invoice) {
        throw new BadRequestException('Invoice not found');
      }
    }

    return await this.invoiceDetailsRepository.save({
      ...invoiceDetail,
      ...validDto,
      invoice,
    });
  }

  async remove(id: number) {
    return await this.invoiceDetailsRepository.delete(id);
  }
}
