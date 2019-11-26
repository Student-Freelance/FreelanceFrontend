pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build . --tag frontend'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker run -it -d -p 4000:80 --name dfrontend frontend'
      }
    }

    stage('Completed') {
      steps {
        timestamps()
      }
    }

  }
}