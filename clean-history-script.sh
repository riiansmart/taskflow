#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}TaskFlow Git History Cleanup${NC}"
echo -e "${YELLOW}===========================${NC}\n"

# Verify we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
  echo -e "${RED}Error: Please run this script from the project root directory (containing 'backend' and 'frontend')${NC}"
  exit 1
fi

# Create backup branch
BACKUP_BRANCH="backup-before-secret-cleanup-$(date +%Y%m%d%H%M%S)"
echo -e "${GREEN}Creating backup branch: ${BACKUP_BRANCH}${NC}"
git branch "$BACKUP_BRANCH"

# Create or update .env files
echo -e "\n${GREEN}Creating environment files from templates...${NC}"

# Copy backend env example
if [ -f ".env.example" ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
else
  echo -e "${YELLOW}Warning: .env.example not found in project root. Creating sample .env file...${NC}"
  cat > .env << EOF
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/taskflow_db
SPRING_DATASOURCE_USERNAME=dbuser
SPRING_DATASOURCE_PASSWORD=dbpassword

# JWT Configuration
APP_JWT_SECRET=$(openssl rand -base64 64)
APP_JWT_EXPIRATION=86400000
APP_JWT_REFRESH_EXPIRATION=604800000

# Server Configuration
SERVER_PORT=8081
EOF
  echo "Created .env with sample configuration"
fi

# Create frontend env
if [ ! -d "frontend" ]; then
  echo -e "${RED}Error: frontend directory not found${NC}"
  exit 1
fi

if [ -f "frontend/.env.example" ]; then
  cp frontend/.env.example frontend/.env
  echo "Created frontend/.env from template"
else 
  echo -e "${YELLOW}Warning: frontend/.env.example not found. Creating sample file...${NC}"
  mkdir -p frontend
  cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8081/api
VITE_ENV=development
EOF
  echo "Created frontend/.env with sample configuration"
fi

# Update application.properties to use environment variables
if [ -f "backend/src/main/resources/application.properties" ]; then
  echo -e "\n${GREEN}Updating application.properties to use environment variables...${NC}"
  
  # Create backup
  cp backend/src/main/resources/application.properties backend/src/main/resources/application.properties.bak
  
  # Modify the file
  cat > backend/src/main/resources/application.properties << EOF
spring.application.name=backend

# Database Configuration
spring.datasource.url=\${SPRING_DATASOURCE_URL}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=\${SERVER_PORT:8081}

# JWT Settings
app.jwt.secret=\${APP_JWT_SECRET}
app.jwt.expiration=\${APP_JWT_EXPIRATION:86400000}
app.jwt.refresh-expiration=\${APP_JWT_REFRESH_EXPIRATION:604800000}

# Logging Configuration
logging.level.root=\${LOGGING_LEVEL_ROOT:INFO}
logging.level.com.taskflow=\${LOGGING_LEVEL_COM_TASKFLOW:DEBUG}
EOF
  echo "Updated application.properties to use environment variables"
else
  echo -e "${RED}Warning: application.properties not found at expected location${NC}"
fi

# Create updated .gitignore
echo -e "\n${GREEN}Creating updated .gitignore...${NC}"
cat > .gitignore << EOF
# Maven
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

# IntelliJ IDEA
.idea/
*.iws
*.iml
*.ipr

# Eclipse
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

# VS Code
.vscode/
*.code-workspace

# Node
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Frontend build
/frontend/dist
/frontend/.env
/frontend/.env.*
!/frontend/.env.example

# Backend properties with sensitive info
/backend/src/main/resources/application.properties
/backend/src/main/resources/application-*.properties
*.env
.env.*
!.env.example

# Logs
logs/
*.log

# Database
*.sql.gz
*.dump

# OS specific
.DS_Store
Thumbs.db

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Debug
.attach_pid*

# TypeScript
*.tsbuildinfo

# Prisma
generated/
EOF
echo "Updated .gitignore"

# Create .env.example file
echo -e "\n${GREEN}Creating .env.example...${NC}"
cat > .env.example << EOF
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/taskflow_db
SPRING_DATASOURCE_USERNAME=dbuser
SPRING_DATASOURCE_PASSWORD=dbpassword

# JWT Configuration
APP_JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_complex
APP_JWT_EXPIRATION=86400000
APP_JWT_REFRESH_EXPIRATION=604800000

# Server Configuration
SERVER_PORT=8081

# Logging Level
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_TASKFLOW=DEBUG
EOF
echo "Created .env.example"

# Create frontend/.env.example
echo -e "\n${GREEN}Creating frontend/.env.example...${NC}"
mkdir -p frontend
cat > frontend/.env.example << EOF
VITE_API_URL=http://localhost:8081/api
VITE_ENV=development
EOF
echo "Created frontend/.env.example"

# Commit changes
echo -e "\n${GREEN}Committing changes...${NC}"
git add .gitignore .env.example frontend/.env.example backend/src/main/resources/application.properties
git commit -m "feat: improve secret management with environment variables"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Review the changes with 'git diff HEAD~1'"
echo -e "2. If everything looks good, push to your repository with 'git push'"
echo -e "3. If there are issues, you can restore from the backup branch with:"
echo -e "   git reset --hard $BACKUP_BRANCH"
echo -e "\n${GREEN}Script completed successfully!${NC}"