import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailsRepository: Repository<InvoiceDetail>,

    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) { }

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
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

  async update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
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
