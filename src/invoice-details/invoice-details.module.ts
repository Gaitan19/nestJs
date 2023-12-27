import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsController } from './invoice-details.controller';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from 'src/invoices/invoices.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { SellersModule } from 'src/sellers/sellers.module';
import { SellersService } from 'src/sellers/sellers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceDetail]),
    InvoicesModule,
    ProductsModule,
    SellersModule,
    CustomersModule,
  ],
  controllers: [InvoiceDetailsController],
  providers: [
    InvoiceDetailsService,
    InvoicesService,
    ProductsService,
    SellersService,
    CustomersService,
  ],
})
export class InvoiceDetailsModule {}
