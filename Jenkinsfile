pipeline {
  agent {
    dockerfile {
      args '-v /vulnerable-blog-web-app/node_modules -p 3000:3000'
    }
  }
  triggers { pollSCM 'H/5 * * * *' }
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
        sleep 1
        '''

        input message: 'Finished using the web site? (Click "Proceed" to continue)'

        sh'''
        kill $(cat .pidfile)
        '''

      }
    }
  }
}