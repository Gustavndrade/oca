import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { UnitModule } from './modules/unit/unit.module';
import { GuestModule } from './modules/guest/guest.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { PaymentModule } from './modules/payment/payment.module';
import { FinancialModule } from './modules/financial/financial.module';

@Module({
  imports: [
    PrismaModule,
    OrganizationModule,
    UserModule,
    PropertyModule,
    UnitModule,
    GuestModule,
    ReservationModule,
    PaymentModule,
    FinancialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
