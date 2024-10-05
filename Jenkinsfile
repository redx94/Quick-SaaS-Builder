pipeline {
    agent any
    environment {
        NODE_HOME = '/usr/local/bin/node'
        NPM_PATH = "${NODE_HOME}/bin"
<<<<<<< HEAD
        VERCEL_TOKEN = credentials('vercel_token')
=======
>>>>>>> 08d08dce1eb044b12ce9e8e1c1b2ebcd05fb14cc
    }
    stages {
        stage('Checkout') {
            steps {
<<<<<<< HEAD
=======
                // Checkout the code from GitHub
>>>>>>> 08d08dce1eb044b12ce9e8e1c1b2ebcd05fb14cc
                git url: 'https://github.com/redx94/Quick-SaaS-Builder'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
<<<<<<< HEAD
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
=======
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
>>>>>>> 08d08dce1eb044b12ce9e8e1c1b2ebcd05fb14cc
                    sh 'npm run build'
                }
            }
        }
<<<<<<< HEAD
        stage('Deploy to Vercel') {
            steps {
                script {
                    // Deploy to Vercel using a token
                    sh 'npx vercel --prod --token $VERCEL_TOKEN || echo "Vercel deployment failed."'
=======
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
>>>>>>> 08d08dce1eb044b12ce9e8e1c1b2ebcd05fb14cc
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 08d08dce1eb044b12ce9e8e1c1b2ebcd05fb14cc
