package hr.addiko.riznica.blog



class Category {

    Long id
    String name

    static hasMany = [posts: Post]

    static mapping = {
        posts cascade: 'all-delete-orphan'
    }

    static constraints = {
        id nullable: true
        name nullable: true, blank: false
    }
}
