pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        BACKEND_PORT = '3000'
        FRONTEND_PORT = '4200'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building frontend application...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy Backend') {
            steps {
                echo 'Starting backend server...'
                dir("${BACKEND_DIR}") {
                    sh '''
                        # Kill any existing process on port 3000
                        pkill -f "node.*server" || true
                        
                        # Start backend in background
                        nohup npm start > backend.log 2>&1 &
                        
                        # Wait for backend to start
                        sleep 5
                        
                        # Check if backend is running
                        if curl -s http://localhost:3000 > /dev/null; then
                            echo "Backend is running on port 3000"
                        else
                            echo "Backend failed to start"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                echo 'Starting frontend server...'
                dir("${FRONTEND_DIR}") {
                    sh '''
                        # Kill any existing process on port 4200
                        pkill -f "ng serve" || true
                        
                        # Start frontend in background
                        nohup npm start > frontend.log 2>&1 &
                        
                        # Wait for frontend to start
                        sleep 10
                        
                        echo "Frontend is running on port 4200"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Application deployed successfully!'
            echo 'Backend: http://172.169.248.203:3000'
            echo 'Frontend: http://172.169.248.203:4200'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
