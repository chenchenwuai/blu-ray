import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Logger } from './common/utils/logger'

import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ArticleModule } from './modules/article/article.module'
import { TagModule } from './modules/tag/tag.module'
import { CategoryModule } from './modules/category/category.module'

const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
Logger.log('Load ENV FILE :', envPath)
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: envPath,
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService:ConfigService) => ({
				type: 'mysql',
				host: configService.get('DB_HOST', '0.0.0.0'),
				port: configService.get<number>('DB_PORT', 3306),
				username: configService.get('DB_USER', 'root'),
				password: configService.get('DB_PASSWD', 'admin'),
				database: configService.get('DB_DATABASES', 'blu_ray'),
				synchronize: true,
				entities: ['dist/**/*.entity{ .ts,.js}'],
				charset: 'utf8mb4'
			})
		}),
		UserModule,
		AuthModule,
		ArticleModule,
		TagModule,
		CategoryModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
