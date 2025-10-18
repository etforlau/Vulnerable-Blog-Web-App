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
    stage('Run') {
      steps {
        echo 'Running...'
        sh'''
        node index.js
        '''
      }
    }
  }
}