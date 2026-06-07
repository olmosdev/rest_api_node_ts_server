import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
		.topbar-wrapper .link {
			content: url('https://cdn3d.iconscout.com/3d/premium/thumb/product-3d-icon-png-download-4863042.png?f=webp');
			height: 120px;
			width: auto;
			object-fit: contain;
			max-width: 100%;
		}
		.swagger-ui .topbar {
			background-color: #2b3b45;
		}
	`,
  customSiteTitle: "REST API Node.js / Express / TypeScript",
};

export default swaggerSpec;
export { swaggerUiOptions };
