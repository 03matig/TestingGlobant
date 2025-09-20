# E2E Testing Globant

Este repositorio está dedicado a las pruebas de testing con reporting automatizado como tarea asignada por parte de Darwin Ramos y Claudio Alarcón como parte del programa de beca de pasantías Academia Desafío Latam.

## 🧾 Descripción

Este proyecto automatiza los flujos de prueba para sitios ficticios como _AskOmDch_, _Saucedemo_ y _Demoblaze_; utilizando las herramientas de testing y reportes automatizados _Cypress_ + _Cucumber_; con prácticas de _Page Object Modelling_ + _CI/CD_ en _GitHub Actions_, con reportes vía terminal y HTML.

## 🌿 Branching Model
Este repositorio adopta un modelo de ramas por funcionalidades (feature branches) inspirado en Git Flow simplificado, ideal para entornos de automatización de pruebas y colaboración continua.

```bash
├── main               # Rama principal con el código estable y versionado
├── feat/askomdch      # Rama con pruebas y configuración del sitio AskOmDch
├── feat/saucedemo     # Rama con pruebas específicas para el sitio SauceDemo
└── feat/demoblaze     # Rama con pruebas específicas para el sitio Demoblaze

```

### ✅ Reglas del modelo:
* Toda nueva funcionalidad o sitio de pruebas debe desarrollarse en una rama feat/<nombre> (por ejemplo: feat/askomdch).
* Las pruebas deben validarse localmente y mediante CI antes de solicitar un pull request hacia main.
* No se trabaja directamente en main, esta rama refleja el estado estable y probado del repositorio.
* Se recomienda eliminar las ramas feat/* una vez mergeadas para mantener limpio el historial de GitHub.

### 🚀 Flujo típico de trabajo:
1. Crear una nueva rama:
```bash
git checkout -b feat/<nueva-funcionalidad>
```
2. Desarrollar y probar localmente

3. Hacer push
```bash
git checkout -b feat/<nueva-funcionalidad>
```
4. Crear Pull Request en GitHub → Target: main.

5. Merge tras aprobación y validación de _Continuous Integration_ (_CI_)

6. (Opcional) Eliminar la rama ```feat/<nueva-funcionalidad>```

Este modelo permite paralelizar pruebas en distintos sitios o flujos sin comprometer la estabilidad del entorno principal.

## 📁 Estructura del proyecto

```bash
TESTINGGLOBANT/
├── .github/                         # Workflows para CI/CD con GitHub Actions
│   └── workflows/
│       └── reportingCypress.yml     # Pipeline para correr pruebas E2E con CypressJS
├── cypress/
│   ├── e2e/
│   │   ├── features/               # Archivos .feature escritos en Gherkin
│   │   │   ├── login.feature
│   │   │   └── signup.feature
│   │   ├── step_definitions/       # Steps que implementan los feature steps
│   │   │   ├── login.ts
│   │   │   └── signup.ts
│   │   ├── tests/                  # Pruebas alternativas con Mocha (opcional)
│   │   ├── POM/                    # Page Object Model con lógica reutilizable
│   │   │   ├── home.Page.js
│   │   │   └── account.Page.js
│   ├── fixtures/                   # Datos de prueba simulados (opcional)
│   └── support/                    # Comandos personalizados y configuración global
├── cypress.config.js               # Configuración principal de Cypress
├── cypress.env.json                # Variables de entorno locales (⚠️ No subir a git)
├── tsconfig.json                   # Configuración de TypeScript
├── package.json                    # Dependencias y scripts del proyecto
└── README.md                       # Esta documentación
```

## 🚀 Instrucciones para clonar y levantar el entorno

```bash
# Clonar el repositorio
git clone https://github.com/03matig/TestingGlobant.git
cd TestingGlobant

# Instalar dependencias
npm install
npx cypress open || npx cypress run
```

## 🧪 Ejecutar pruebas individuales

### ✅ Cypress sin Cucumber
```bash
npx cypress run --spec "cypress/e2e/tests/miTest.cy.ts"
```

### ✅ Cypress con Cucumber (una sola prueba .feature)
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## 🧪 Ejecutar múltiples pruebas Cucumber

### ✅ Ejecutar todas las pruebas .feature
```bash
npx cypress run --spec "cypress/e2e/features/**/*.feature"
```

### ✅ Ejecutar solo los escenarios con un tag específico (por ejemplo: @signup)
```bash
npx cypress run --env TAGS="@signup"
```

Esto requiere tener TAGS configurado con el plugin @badeball/cypress-cucumber-preprocessor. Si lo tienes, también puedes configurar tags múltiples como:
```bash
npx cypress run --env TAGS="@signup and not @wip"
```

## 📊 Generar reporte HTML de pruebas (cucumber-html-reporter)

Pasos:
1. Instalar separadamente el generador (no fue descargado/instalado antes del último commit, por ende no está en package.json)
    ```bash
    npm install --save-dev multiple-cucumber-html-reporter
    ```
2. Generar el reporte después de correr pruebas
    ```bash
    npx multiple-cucumber-html-reporter --reportPath=cucumber-report --jsonDir=cypress/cucumber-json
    ```

    Asegúrate de que @badeball/cypress-cucumber-preprocessor esté configurado para guardar los .json en cypress/cucumber-json.

## 🛠 Variables de entorno (local o GitHub Actions)
Asegúrate de tener estas variables definidas en tu entorno local (cypress.env.json) o como Secrets en GitHub:

```json
{
  "baseUrl": "https://askomdch.com",
  "username": "yourUsername",
  "email": "yourEmail@mail.com",
  "password": "yourPassword"
}
```

En GitHub Actions deben estar definidos como:

```yml
env:
  CYPRESS_baseUrl: ${{ secrets.CYPRESS_BASE_URL }}
  CYPRESS_username: ${{ secrets.CYPRESS_USERNAME }}
  CYPRESS_email: ${{ secrets.CYPRESS_EMAIL }}
  CYPRESS_password: ${{ secrets.CYPRESS_PASSWORD }}
```

## ✒️ Pendientes 
Por el momento, los archivos de feature y steps que funcionan son los que están a la altura de ```cypress/e2e/*.feature``` y ```cypress/e2e/*.ts```; sin embargo, dado el tamaño del directorio de pruebas, queda pendiente el desglose del repositorio y pasarlo a los subdirectorios ```cypress/e2e/features/*.feature``` y ```cypress/e2e/step_definitions/*.ts```.

## ✨ Créditos

Desarrollado por Matías Garín, bajo supervisión de Darwin Ramos y Claudio Alarcón – Globant & Desafío Latam 2025 🚀