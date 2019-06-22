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
        PROJECT_HOME_MESSAGE: 'Home OK',
        PAGE_NAME_HOME_MESSAGE: 'Projects',
        PROJECT_NEW_PROJECT_MESSAGE: 'Nuevo projecto',
        PAGE_NEW_PROJECT_HOME_MESSAGE: 'New project',
    }
};

module.exports = constants;