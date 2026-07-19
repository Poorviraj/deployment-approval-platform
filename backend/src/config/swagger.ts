import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument =
    YAML.load("./docs/swagger.yaml");

export {

    swaggerUi,

    swaggerDocument

};