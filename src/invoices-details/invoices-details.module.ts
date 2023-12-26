import { Module } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices-details.service';
import { InvoicesDetailsController } from './invoices-details.controller';
import { InvoicesDetail } from './entities/invoices-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { InvoicesService } from 'src/invoices/invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesDetail]), InvoicesModule],
  controllers: [InvoicesDetailsController],
  providers: [InvoicesDetailsService, InvoicesService],
})
export class InvoicesDetailsModule {}
