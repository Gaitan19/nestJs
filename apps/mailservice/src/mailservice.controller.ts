/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { MailserviceService } from './mailservice.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './emails/entities/email.entity';
import { BaseEntity, Repository } from 'typeorm';

@Controller()
export class MailserviceController {
  constructor(private readonly mailserviceService: MailserviceService,
    @InjectRepository(Email)
    private emailsRepository: Repository<Email>,) {

  }



  @Get()
  getHello(): string {
    return this.mailserviceService.getHello();
  }

  @MessagePattern('new_created')
  async handleItemCreated(@Payload() payload: { type: string; data: BaseEntity }) {


    const emailEntity = this.emailsRepository.create({
      description: `New ${payload.type.toLowerCase()} added`,
      email: JSON.stringify(payload.data),
      date: new Date(),
    });

    return await this.emailsRepository.save(emailEntity);


  }
}
