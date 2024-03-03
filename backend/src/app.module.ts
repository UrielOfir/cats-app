import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CatModule } from './cats/cat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available throughout your application
      envFilePath: '.env', // Load test environment variables
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Make sure ConfigModule is imported
      useFactory: async (configService: ConfigService) => {
        // Determine if the application is running in a test environment
        const isTestEnv = configService.get('NODE_ENV') === 'test';
        const path = __dirname + '/**/*.entity{.ts,.js}';
        const baseOptions = {
          type: 'postgres',
          entities: [path],
          synchronize: true,
        };

        const options = isTestEnv
          ? {
              host: configService.get('TEST_DB_HOST'),
              port: configService.get('TEST_DB_PORT'),
              username: configService.get('TEST_DB_USERNAME'),
              password: configService.get('TEST_DB_PASSWORD'),
              database: configService.get('TEST_DB_NAME'),
            }
          : {
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DB'),
            };
        Logger.log('options', options);
        return { ...options, ...baseOptions } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    CatModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
