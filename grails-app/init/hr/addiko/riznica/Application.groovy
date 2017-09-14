package hr.addiko.riznica

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import grails.plugin.externalconfig.ExternalConfig
import org.springframework.core.env.Environment

class Application extends GrailsAutoConfiguration implements ExternalConfig {

  static Environment environment

  static void main(String[] args) {
    GrailsApp.run(Application, args)
  }

  @Override
  void setEnvironment(Environment environment) {
    Application.environment = environment
    ExternalConfig.super.setEnvironment(environment)
  }
}