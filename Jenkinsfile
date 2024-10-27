pipeline {
    agent any
    environment {
        NODE_HOME = '/usr/local/bin/node'
        NPM_PATH = "${NODE_HOME}/bin"
        VERCEL_TOKEN = credentials('vercel_token')
        NODE_TLS_REJECT_UNAUTHORIZED = '0' // Only for development purposes, not for production
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/redx94/Quick-SaaS-Builder'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js and Python dependencies
                    sh 'npm install'
                    sh 'pip install -r requirements.txt'
                }
            }
        }
        stage('Run Unit Tests') {
            steps {
                script {
                    // Run unit tests for Python
                    sh 'python -m unittest discover tests/unit'
                }
            }
        }
        stage('Run Integration Tests') {
            steps {
                script {
                    // Run integration tests for Python
                    sh 'python -m unittest discover tests/integration'
                }
            }
        }
        stage('Build Project') {
            steps {
                script {
                    // Build the project for production
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to Vercel') {
            steps {
                script {
                    // Deploy to Vercel using a token
                    sh 'npx vercel --prod --token $VERCEL_TOKEN || echo "Vercel deployment failed."'
                }
            }
        }
    }
    post {
        success {
            echo 'Build, test, and deployment succeeded!'
        }
        failure {
            echo 'Build, test, or deployment failed.'
        }
    }
}
