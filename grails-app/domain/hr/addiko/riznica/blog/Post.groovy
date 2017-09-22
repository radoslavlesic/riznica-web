package hr.addiko.riznica.blog

import hr.addiko.riznica.User

class Post {

    Long id
    String title
    String content
    Date dateCreated

    Category category
    User user
  String authorName

    static belongsTo = [category: Category, user: User]
    static hasMany = [comments: Comment]

    static mapping = {
        comments cascade:"all-delete-orphan"
    }

    static constraints = {
       id nullable: true
       category nullable: true
       title nullable: false
       content nullable: false
       authorName nullable: false
    }
}
