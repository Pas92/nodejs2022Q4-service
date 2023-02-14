import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeORMConfig implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private envConfig: ConfigService;

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.envConfig.get('POSTGRES_HOST'),
      port: this.envConfig.get('POSTGRES_PORT'),
      database: this.envConfig.get('POSTGRES_DB'),
      username: this.envConfig.get('POSTGRES_USER'),
      password: this.envConfig.get('POSTGRES_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/**/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      synchronize: false,
    };
  }
}
