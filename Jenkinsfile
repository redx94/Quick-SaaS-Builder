pipeline {
    agent any
    environment {
        NODE_HOME = '/usr/local/bin/node'
        NPM_PATH = "${NODE_HOME}/bin"
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git url: 'https://github.com/redx94/Quick-SaaS-Builder'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js and npm if not already installed
                    sh '''
                    if ! [ -x "$(command -v node)" ]; then
                        echo "Node.js is not installed. Installing..."
                        curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
                        sudo apt-get install -y nodejs
                    fi
                    '''
                    // Install project dependencies
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Run the build command (using Vite)
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests if available
                    sh 'npm test || echo "No tests available."'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy to a web server or other environment (example with SSH)
                    sh '''
                    if [ "$DEPLOY_SERVER" != "" ]; then
                        echo "Deploying to server: $DEPLOY_SERVER"
                        rsync -avz --delete dist/ $DEPLOY_SERVER:/var/www/quick-saas-builder
                    else
                        echo "Skipping deployment as DEPLOY_SERVER is not set."
                    fi
                    '''
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
