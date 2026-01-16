import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateTransactionOwnerService } from './validate-transaction-owner.service';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnerService],
})
export class TransactionsModule {}
