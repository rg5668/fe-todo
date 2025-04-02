export interface EndpointSectionProps {
  title: string;
  endpoints: Array<{
    method: string;
    path: string;
    summary: string;
    description: string;
    parameters?: Array<{
      name: string;
      in: string;
      required?: boolean;
      schema: {
        type: string;
        example: unknown;
      };
      description: string;
    }>;
    requestBody?: {
      content: {
        'application/json': {
          schema: {
            type: string;
            properties: Record<string, unknown>;
            required?: string[];
          };
        };
      };
    };
    responses: Array<{
      status: string;
      description: string;
      content: {
        'application/json': {
          schema: {
            type: string;
            properties: Record<string, unknown>;
          };
        };
      };
    }>;
  }>;
}
