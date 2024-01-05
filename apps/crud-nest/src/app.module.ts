import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';
import { SellersModule } from './sellers/sellers.module';
import { EmailsModule } from './emails/emails.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'admin',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule.register([
      { name: 'MAIL_SERVICE', transport: Transport.TCP },
    ]),
    ProductsModule,
    InvoicesModule,
    CustomersModule,
    InvoiceDetailsModule,
    SellersModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
