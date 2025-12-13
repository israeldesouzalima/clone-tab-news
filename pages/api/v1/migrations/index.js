import { runner } from 'node-pg-migrate';
import { join } from 'path';

export default async function migrations(req, res){

  if (req.method === 'GET'){
    const migrationsResponse = await runner({   
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    })
    
    return res.status(200).json(migrationsResponse)
  }

  if (req.method === 'POST'){
    const migrationsResponse = await runner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    })
    
    return res.status(200).json(migrationsResponse)
  }

  return res.status(405).end()
    
}