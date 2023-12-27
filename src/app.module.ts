import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    InvoicesModule,
    CustomersModule,
    InvoiceDetailsModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
