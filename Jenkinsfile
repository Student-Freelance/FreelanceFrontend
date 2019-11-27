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
        sh '''docker login --username=emilvinkel@gmail.com --password=$Htoken registry.heroku.com
docker tag frontend registry.heroku.com/free-lancer/web
docker push registry.heroku.com/free-lancer/web'''
      }
    }

    stage('Completed') {
      steps {
        echo 'Done'
      }
    }

  }
}