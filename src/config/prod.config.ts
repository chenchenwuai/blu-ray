import { resolve } from 'path'

export default {
  port: 8001,

  orm: {
    type: 'mysql',
    host: 'Localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest_hello_world',
    entities: [resolve('./**/*.entity.js')],
    migrations: ['migration/*.ts'],
    dropSchema: false,
    synchronize: false,
    logging: false,
  },
}
