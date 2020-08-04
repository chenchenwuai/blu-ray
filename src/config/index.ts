import * as _ from 'lodash'
import { resolve } from 'path'

import productionConfig from './prod.config'

export const isProd = process.env.NODE_ENV === 'production'

let config = {
  port: 8000,
  hostName: 'localhost',

  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blu_ray',
    synchronize: true,
    entities: ['src/shared/entity/**/*.entity.ts'], // mapping class
    migrations: ['src/shared/migration/**/*.ts'], // 存放数据库版本管控(migration)的目录
    charset: 'utf8mb4'
  },

  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 60 * 60 * 24 * 30,
    },
  },
}

if (isProd) {
  config = _.merge(config, productionConfig)
}

export { config }
export default config
