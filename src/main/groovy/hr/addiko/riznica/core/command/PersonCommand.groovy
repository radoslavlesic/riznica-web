package hr.addiko.riznica.core.command

import grails.validation.Validateable

class PersonCommand implements Validateable {

  Long id
  String name
  String email
  String phone

  static constraints = {
    id nullable: true
    name nullable: true
    email nullable: true
    phone nullable: true
  }
} 
