def STARTED = false

pipeline {
  agent any
  options {
      buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  parameters {
    string(name: 'SLACK_CHANNEL',
           description: 'Slack channel to send messages to',
           defaultValue: '#direccte')
  }
  stages {
    stage('Init') {
      when {
        anyOf {
          branch 'develop'
        }
      }
      steps {
        notifyBuild()
        echo "Init $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
                .c42/scripts/install.sh
            '''
        }
      }
    }
    stage('Build') {
      when {
        anyOf {
          branch 'develop'
        }
      }
      steps {
        echo "Building $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
                .c42/scripts/build.sh
            '''
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Staging') {
          when {
            anyOf {
              branch 'develop'
            }
          }
          steps {
            echo "Deploying $BRANCH_NAME from $JENKINS_URL ..."
            sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
              sh '''
                .c42/scripts/deploy.sh
              '''
            }
          }
        }
      }
    }
  }
  post {
      always {
          sh '''
            docker-compose down
            sudo chown -R $(id -u):$(id -g) ./
            '''
          deleteDir()
      }
      success {
          notifyBuild("SUCCESSFUL");
      }
      failure {
          notifyBuild("FAILED");
      }
  }
}

@NonCPS
def getChangeString() {
 MAX_MSG_LEN = 100
 def changeString = ""

 echo "Gathering SCM changes"
 def changeLogSets = currentBuild.changeSets
 for (int i = 0; i < changeLogSets.size(); i++) {
 def entries = changeLogSets[i].items
 for (int j = 0; j < entries.length; j++) {
 def entry = entries[j]
 truncated_msg = entry.msg.take(MAX_MSG_LEN)
 changeString += " - ${truncated_msg} [${entry.author}]\n"
 }
 }

 if (!changeString) {
 changeString = " - No new changes"
 }
 return changeString
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  def colorCode = "#E01563"
  def emoji = ":x:"

  if (buildStatus == 'STARTED') {
    colorCode = "#6ECADC"
    emoji = ":checkered_flag:"
    STARTED = true;
  } else if (buildStatus == 'WAITING') {
    colorCode = "#FFC300"
    emoji = ":double_vertical_bar:"
  } else if (buildStatus == 'SUCCESSFUL') {
    colorCode = "#3EB991"
    emoji = ":ok_hand:"
  }

  def subject = "${emoji} *${buildStatus}* - ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
  if(buildStatus == "STARTED") {
      subject = "${subject}\n\nChangelog:\n" + getChangeString()
  }
  def summary = "${subject}\n\n${env.BUILD_URL}"

  if(STARTED) {
    slackSend (color: colorCode, message: summary, channel: "${params.SLACK_CHANNEL}")
  }
}
