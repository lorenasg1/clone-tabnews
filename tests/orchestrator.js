import retry from "async-retry";
import database from "infra/database";

export async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 30,
      factor: 1,
      minTimeout: 100,
      maxTimeout: Number.POSITIVE_INFINITY,
      // maxTimeout: 1000,
      randomize: false,
    });

    async function fetchStatusPage(bail, tryNumber) {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch status page. Try number: ${tryNumber}`,
        );
      }
    }
  }
}

export async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
