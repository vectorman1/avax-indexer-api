import { Module } from '@nestjs/common';
import { blocksProviders } from 'src/blocks/blocks.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...blocksProviders],
  exports: [...blocksProviders],
})
export class BlocksModule {}
