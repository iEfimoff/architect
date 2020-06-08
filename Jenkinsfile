pipeline {
  agent any
  stages {
    stage('Fraud CI') {
      parallel {
        stage('1-File steps') {
          steps {
            echo 'git clone fraud'
            echo 'mvn clean package'
            echo 'git clone tests'
            echo 'copy files on server'
            echo 'on server clone folder n-times'
            echo 'edit files n-times'
          }
        }

        stage('2-Database steps') {
          steps {
            echo 'sql> create database users'
            echo 'db actualization'
            echo '$ export new user\'s schema'
            echo '$ import schema for new users'
            echo 'sql> update db settings for each new user'
          }
        }

      }
    }

    stage('3-Tests') {
      steps {
        echo 'docker run containers'
        echo 'run tests'
        archiveArtifacts '*/**'
      }
    }

  }
}