import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnerService } from './validate-category-owner.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnerService],
  exports: [ValidateCategoryOwnerService],
})
export class CategoriesModule {}
