package hr.addiko.riznica.core.command

import grails.validation.Validateable 
 
class FetchEntityDetailsCommand implements Validateable { 
 
  Long entityId 
 
  static constraints = { 
    entityId nullable: false, min: 1L 
  } 
} 
