import database from "@/infra/database";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const databaseInfo = await database.query({
    text: `SELECT
    current_setting('server_version') AS version,
    current_setting('max_connections')::int AS max_connections,
    (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS opened_connections;
    `,
    values: [databaseName],
  });

  const { version, max_connections, opened_connections } = databaseInfo.rows[0];

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections,
        opened_connections,
      },
    },
  });
}
