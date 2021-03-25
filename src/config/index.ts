import * as _ from 'lodash'

import productionConfig from './prod.config'

export const isProd = process.env.NODE_ENV === 'production'

let config = {
	port: 8080,
	hostName: '192.168.31.13',

	orm: {
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'admin123',
		database: 'blu_ray',
		synchronize: true,
		entities: ['dist/**/*.entity{ .ts,.js}'], // mapping class
		migrations: ['dist/shared/migration/**/*.ts'], // 存放数据库版本管控(migration)的目录
		charset: 'utf8mb4'

	},

	jwt: {
		secret: 'secretKey',
		signOptions: {
			expiresIn: 60 * 60 * 24 * 30
		}
	}
}

if (isProd) {
	config = _.merge(config, productionConfig)
}

export default config
