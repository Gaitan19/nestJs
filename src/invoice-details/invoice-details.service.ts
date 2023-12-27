import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailsRepository: Repository<InvoiceDetail>,

    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
    const { invoiceId, productid, ...validDto } = createInvoiceDetailDto;

    const invoice = await this.invoicesRepository.findOneBy({ id: invoiceId });

    const product = await this.productsRepository.findOneBy({ id: productid });

    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    if (!product) {
      throw new BadRequestException('Invoice not found');
    }

    const invoiceDetail = this.invoiceDetailsRepository.create({
      ...validDto,
      product,
      invoice,
    });
    return await this.invoiceDetailsRepository.save(invoiceDetail);
  }

  findAll() {
    return this.invoiceDetailsRepository.find({
      relations: {
        product: true,
        invoice: true,
      },
    });
  }

  findOne(id: number) {
    return this.invoiceDetailsRepository.findOne({
      where: { id: id },
      relations: {
        product: true,
        invoice: true,
      },
    });
  }

  async update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    const { invoiceId, productid, ...validDto } = updateInvoiceDetailDto;

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

    let product;
    if (productid) {
      product = await this.invoicesRepository.findOneBy({
        id: productid,
      });

      if (!product) {
        throw new BadRequestException('Invoice not found');
      }
    }

    return await this.invoiceDetailsRepository.save({
      ...invoiceDetail,
      ...validDto,
      product,
      invoice,
    });
  }

  async remove(id: number) {
    return await this.invoiceDetailsRepository.delete(id);
  }
}
