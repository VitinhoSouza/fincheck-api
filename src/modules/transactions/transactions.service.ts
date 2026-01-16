import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnerService } from '../bank-accounts/validate-bank-account-owner.service';
import { ValidateCategoryOwnerService } from '../categories/validate-category-owner.service';
import { ValidateTransactionOwnerService } from './validate-transaction-owner.service';
import { TransactionType } from './entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnerService: ValidateBankAccountOwnerService,
    private readonly validateCategoryOwnerService: ValidateCategoryOwnerService,
    private readonly validateTransactionOwnerService: ValidateTransactionOwnerService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validateOwnerships(
      userId,
      createTransactionDto.bankAccountId,
      createTransactionDto.categoryId,
    );

    return this.transactionsRepo.create({
      data: {
        userId,
        ...createTransactionDto,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateOwnerships(
      userId,
      updateTransactionDto.bankAccountId,
      updateTransactionDto.categoryId,
      transactionId,
    );

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        ...updateTransactionDto,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateOwnerships(userId, undefined, undefined, transactionId);

    return this.transactionsRepo.delete({
      where: { id: transactionId },
    });
  }

  private async validateOwnerships(
    userId: string,
    bankAccountId?: string,
    categoryId?: string,
    transactionId?: string,
  ) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnerService.validate(userId, bankAccountId),
      categoryId &&
        this.validateCategoryOwnerService.validate(userId, categoryId),
      transactionId &&
        this.validateTransactionOwnerService.validate(userId, transactionId),
    ]);
  }
}
