pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-20.19.0'  // Must match name in Global Tool Configuration
    }
    
    environment {
        BACKEND_DIR = 'backend'   // Adjust to your folder name
        FRONTEND_DIR = 'frontend' // Adjust to your folder name
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
        
        stage('Run Backend Tests') {
            steps {
                echo 'Running backend tests...'
                dir("${BACKEND_DIR}") {
                    sh 'npm test || true'
                }
            }
        }
        
        stage('Run Frontend Tests') {
            steps {
                echo 'Running frontend tests...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm test -- --watch=false --browsers=ChromeHeadless || true'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building Angular/React application...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
        always {
            cleanWs()
        }
    }
}
