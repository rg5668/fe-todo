export const authEndpoints = [
  {
    method: 'POST',
    path: '/api/auth/login',
    summary: '사용자 로그인',
    description:
      "클라이언트가 이메일과 비밀번호를 전송하면, 서버는 사용자를 검증하여 로그인 성공 시 쿠키에 userId를 저장하고 루트('/')로 리다이렉트합니다.",
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'user@example.com',
              },
              password: {
                type: 'string',
                example: 'password123',
              },
            },
            required: ['email', 'password'],
          },
        },
      },
    },
    responses: [
      {
        status: '200',
        description: '로그인 성공 (쿠키에 userId 저장)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Login successful',
                },
              },
            },
          },
        },
      },
      {
        status: '401',
        description: '로그인 실패',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Invalid credentials',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/auth/signup',
    summary: '사용자 회원가입',
    description:
      "클라이언트가 이메일, 비밀번호, 이름 등의 정보를 전송하면, 서버는 중복 검사를 진행 후 신규 사용자를 생성하고 쿠키에 userId를 저장한 후 루트('/')로 리다이렉트합니다.",
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'newuser@example.com',
              },
              password: {
                type: 'string',
                example: 'password123',
              },
              name: {
                type: 'string',
                example: 'New User',
              },
            },
            required: ['email', 'password'],
          },
        },
      },
    },
    responses: [
      {
        status: '200',
        description: '회원가입 성공 (쿠키에 userId 저장)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Signup successful',
                },
              },
            },
          },
        },
      },
      {
        status: '400',
        description: '잘못된 요청 (예: 중복된 사용자)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'User already exists',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
];

export const todoEndpoints = [
  {
    method: 'GET',
    path: '/api/todos',
    summary: 'Todo 목록 조회',
    description:
      '쿠키에 저장된 userId에 따라 사용자의 Todo 목록을 조회합니다. 쿼리 파라미터로 `all`(전체 조회), `limit`(불러올 항목 수), `offset`(건너뛸 시작 인덱스)을 지원합니다. 필터기능 completed 파라미터를 통해 완료 여부(true 또는 false)에 따른 Todo 목록 필터링을 지원합니다. keyword 파라미터를 통해 title 또는 description에 특정 문자열이 포함된 Todo 항목만 검색할 수 있도록 합니다.',
    parameters: [
      {
        name: 'all',
        in: 'query',
        schema: {
          type: 'string',
          example: 'true',
        },
        description: "전체 데이터를 조회할지 여부 ('true'이면 전체 조회)",
      },
      {
        name: 'limit',
        in: 'query',
        schema: {
          type: 'integer',
          example: 10,
        },
        description: '한 번에 불러올 데이터 수 (없으면 전체 조회)',
      },
      {
        name: 'offset',
        in: 'query',
        schema: {
          type: 'integer',
          example: 0,
        },
        description: '데이터를 건너뛸 시작 인덱스 (기본값: 0)',
      },
      {
        name: 'completed',
        in: 'query',
        schema: {
          type: 'string',
          example: 'false',
        },
        description: '완료 여부',
      },
      {
        name: 'keyword',
        in: 'query',
        schema: {
          type: 'string',
          example: '검색어',
        },
        description: '검색',
      },
    ],
    responses: [
      {
        status: '200',
        description: 'Todo 목록 조회 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                todos: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Todo',
                  },
                },
                count: {
                  type: 'integer',
                  example: 25,
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/todos',
    summary: 'Todo 생성',
    description: '로그인한 사용자가 새로운 Todo를 생성합니다.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'Buy groceries',
              },
              description: {
                type: 'string',
                example: 'Milk, eggs, and bread',
              },
            },
            required: ['title'],
          },
        },
      },
    },
    responses: [
      {
        status: '200',
        description: 'Todo 생성 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                todo: {
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          },
        },
      },
      {
        status: '400',
        description: '잘못된 요청 (예: 제목 누락)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Title is required',
                },
              },
            },
          },
        },
      },
      {
        status: '401',
        description: '인증되지 않음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/todos/{id}',
    summary: '단일 Todo 상세 조회',
    description: '로그인한 사용자의 특정 Todo 상세 정보를 조회합니다.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          example: '101',
        },
        description: '조회할 Todo의 ID',
      },
    ],
    responses: [
      {
        status: '200',
        description: 'Todo 상세 조회 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                todo: {
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          },
        },
      },
      {
        status: '401',
        description: '인증되지 않음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized',
                },
              },
            },
          },
        },
      },
      {
        status: '404',
        description: 'Todo가 존재하지 않거나 접근 권한 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Todo not found or not authorized',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/todos/{id}',
    summary: 'Todo 업데이트',
    description: '로그인한 사용자의 특정 Todo를 업데이트합니다.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          example: '101',
        },
        description: '업데이트할 Todo의 ID',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'Buy groceries and snacks',
              },
              description: {
                type: 'string',
                example: 'Milk, eggs, bread, and chips',
              },
              completed: {
                type: 'boolean',
                example: true,
              },
            },
          },
        },
      },
    },
    responses: [
      {
        status: '200',
        description: 'Todo 업데이트 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                todo: {
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          },
        },
      },
      {
        status: '400',
        description: '잘못된 요청 (업데이트할 필드 없음)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'No valid fields provided for update',
                },
              },
            },
          },
        },
      },
      {
        status: '401',
        description: '인증되지 않음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized',
                },
              },
            },
          },
        },
      },
      {
        status: '404',
        description: 'Todo가 존재하지 않거나 접근 권한 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Todo not found or not authorized',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/todos/{id}',
    summary: 'Todo 삭제',
    description: '로그인한 사용자의 특정 Todo를 삭제합니다.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          example: '101',
        },
        description: '삭제할 Todo의 ID',
      },
    ],
    responses: [
      {
        status: '200',
        description: 'Todo 삭제 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                deleted: {
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          },
        },
      },
      {
        status: '401',
        description: '인증되지 않음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized',
                },
              },
            },
          },
        },
      },
      {
        status: '404',
        description: 'Todo가 존재하지 않거나 접근 권한 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Todo not found or not authorized',
                },
              },
            },
          },
        },
      },
      {
        status: '500',
        description: '서버 오류',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Server error',
                },
              },
            },
          },
        },
      },
    ],
  },
];

export const todoSchema = `{
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "example": 101
      },
      "user_id": {
        "type": "integer",
        "example": 1
      },
      "title": {
        "type": "string",
        "example": "Buy groceries"
      },
      "description": {
        "type": "string",
        "example": "Milk, eggs, and bread"
      },
      "completed": {
        "type": "boolean",
        "example": false
      },
      "created_at": {
        "type": "string",
        "format": "date-time",
        "example": "2023-04-01T12:00:00Z"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "example": "2023-04-01T12:00:00Z"
      }
    }
  }`;

export const flowDiagramMermaid = `flowchart TD
    %% 인증 관련 엔드포인트
    A[Client] --> B[POST /api/auth/login]
    A --> C[POST /api/auth/signup]
    
    B -- "이메일: user@example.com\\n비밀번호: password123" --> D[쿠키에 userId 저장\\n(e.g., userId: 1)\\nRedirect to /]
    C -- "이메일: newuser@example.com\\n비밀번호: password123\\n이름: New User" --> D

    %% Todo 엔드포인트
    D --> E[GET /api/todos\\n(all=true, limit=10, offset=0, completed=false, keyword='')]
    D --> F[POST /api/todos]
    D --> G[GET /api/todos/{id}\\n(id: 101)]
    D --> H[PATCH /api/todos/{id}\\n(id: 101)]
    D --> I[DELETE /api/todos/{id}\\n(id: 101)]

    %% 각 API에 대한 예시 설명
    E --- J[응답 예시:\\n todos: [ { id: 101, title: "Buy groceries", ... } ]\\n count: 25]
    F --- K[요청 예시:\\n { title: "Buy groceries",\\n   description: "Milk, eggs, and bread" }]
    G --- L[응답 예시:\\n { todo: { id: 101, title: "Buy groceries", ... } }]
    H --- M[요청 예시:\\n { title: "Buy groceries and snacks",\\n   completed: true }]
    I --- N[응답 예시:\\n { deleted: { id: 101, title: "Buy groceries", ... } }]
`;
