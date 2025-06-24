import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "cypress/fixtures",
  video: true,
  pageLoadTimeout: 6500,
  e2e: {
    includeShadowDom: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: "https://staging.icharterbooking.com",
    supportFile: "cypress/support/command.ts",
    env: {
      updateSnapshots: false,
    },
    setupNodeEvents(on, config) {
      on("after:spec", (results) => {
        if (results) {
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: "failed" });
          });
        }
      });
      if (config.env.environment === "prod") {
        config.baseUrl = "https://icharterbooking.com";
      } else if (config.env.environment === "stage") {
        config.baseUrl = "https://staging.icharterbooking.com";
      }
      return config;
    },
    reporter: "mochawesome",

    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
