import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsController } from './invoice-details.controller';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from 'src/invoices/invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail]), InvoicesModule],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService, InvoicesService],
})
export class InvoiceDetailsModule { }
