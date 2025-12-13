import { runner } from 'node-pg-migrate';
import { join } from 'path';

export default async function migrations(req, res){

  const defaultOptionsMigration = {   
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join('infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations'
  }

  if (req.method === 'GET'){
    const pendingMigrations = await runner(defaultOptionsMigration)
    return res.status(200).json(pendingMigrations)
  }

  if (req.method === 'POST'){
    const migrations = await runner({
      ...defaultOptionsMigration,
      dryRun: false
    })

    if (migrations.length > 0) {
      return res.status(201).json(migrations)
    }
    
    return res.status(200).json(migrations)
  }

  return res.status(405).end()
    
}