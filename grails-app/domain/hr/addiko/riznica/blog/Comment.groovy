package hr.addiko.riznica.blog

import hr.addiko.riznica.User

class Comment {

  Long id
  String content
  Date dateCreated

  User user
  Post post

  static belongsTo = [user: User, post: Post]

  static constraints = {
    id nullable: true
    content nullable: true
    dateCreated nullable: true
    user nullable: true
  }

  static mapping = {
    user lazy: false
  }
}
