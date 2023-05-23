pipeline {
    agent {
        docker {
            image : 'node:20-alphine3.16'
            args : '-p 3000:3000'
        }
    }

    stages {
        stage('Start') {
            steps {
                sh 'cd pen npm run dev'
            }
        }
    }
}