var constants = {
    HTTP: {
        METHOD: {
            GET: "GET",
            HEAD: "HEAD",
            POST: "POST",
            PUT: "PUT",
            DELETE: "DELETE",
            TRACE: "TRACE",
            OPTIONS: "OPTIONS",
            CONNECT: "CONNECT",
            PATCH: "PATCH"
        },
        CODE: {
            OK: 200,
            CREATION_OK: 202,
            BAD_REQUEST: 400,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500
        },
        MESSAGE: {
            OK: 'Ok',
            CREATION_OK: 'Created Ok',
            NOT_FOUND: 'Not found',
            BAD_REQUEST: 'BAD REQUEST',
            FORBIDDEN: 'Unauthorized',
            INTERNAL_SERVER_ERROR: "Internal Server Error"
        },
    },
    PROJECT_CONTROLLER: {
        PROJECT_HOME_MESSAGE: 'Todos los proyectos',
        PAGE_NAME_HOME_MESSAGE: 'Projects',
        PROJECT_NEW_PROJECT_MESSAGE: 'Nuevo projecto',
        PAGE_NEW_PROJECT_HOME_SUCCESS_MESSAGE: 'New project',
        PAGE_HOME_SUCCESS_MESSAGE: 'Si hay proyectos que mostrar',
        PAGE_HOME_FAIL_MESSAGE: 'Lo sentimos no hay proyectos que mostrar',
        PROJECT_BY_URL_OR_ID_SUCCESS_MESSAGE: 'Projecto encontrado',
        PROJECT_BY_URL_OR_ID_FAIL_MESSAGE: 'Projecto no encontrado',
        NEW_PROJECT_SUCCESS_MESSAGE: 'Proyecto creado satisfactoriamente',
        NEW_PROJECT_FAIL_MESSAGE: 'Lo sentimos algo fue erroneo',
        NEW_PROJECT_ERROR_NO_NAME_MESSAGE: 'Tienes que agregar un nombre al campo',
    },
    DATA_BASE_SETUP: {
        DATA_BASE_NAME: 'backEndUpTaskWithMySQL',
        DATA_BASE_PASSWORD: 'YOUR_MYSQL_KEY',
        DATA_BASE_USERNAME: 'root',
        DATA_BASE_HOST: 'localhost',
        DATA_BASE_DIALECT: 'mysql',
        DATA_BASE_PORT: '3306',
        DATA_BASE_OPERATORS_ALIASES: false,
        DATA_BASE_TIME_STAMP: false,
    }
};

module.exports = constants;