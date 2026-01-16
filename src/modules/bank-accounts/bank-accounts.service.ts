import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnerService } from './validate-bank-account-owner.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnerService: ValidateBankAccountOwnerService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsRepo.create({
      data: {
        ...createBankAccountDto,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnerService.validate(userId, bankAccountId);

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: { ...updateBankAccountDto },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnerService.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
