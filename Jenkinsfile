pipeline {
  agent {
    dockerfile {
      args '-v /vulnerable-blog-web-app/node_modules'
    }
  }
  triggers { pollSCM '*/5 * * * *' }
  environment {
    SESSION_SECRET = credentials('session-secret')
  }
  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        sh'''
        npm install
        '''
      }
    }
    stage('Deiver') {
      steps {
        echo 'Delivering...'
        sh'''
        node index.js &
        '''
      }
    }
  }
}