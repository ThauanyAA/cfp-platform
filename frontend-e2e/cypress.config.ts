const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  projectId: 'jyktba',
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run frontend:serve',
        production: 'nx run frontend:serve:production',
      },
      ciWebServerCommand: 'nx run frontend:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
