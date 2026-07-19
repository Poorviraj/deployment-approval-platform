import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// This builds a dynamic, bulletproof path tracking backwards from src/config/
const swaggerDocument = YAML.load(
    path.join(__dirname, "../../docs/swagger.yaml")
);

export {
    swaggerUi,
    swaggerDocument
};
