import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension('uuid-ossp', { ifNotExists: true })

  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    email: {
      type: 'TEXT',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    isactive: {
      type: 'TEXT',
    },
    date_created: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('users')
}
