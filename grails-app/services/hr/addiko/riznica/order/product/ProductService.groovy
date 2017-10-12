package hr.addiko.riznica.order.product

import grails.plugin.grich.search.service.AdvancedSearchService
import grails.transaction.Transactional
import hr.addiko.riznica.order.ProductCommand
import sun.misc.BASE64Decoder
import sun.misc.BASE64Encoder

import javax.imageio.ImageIO
import javax.imageio.stream.ImageOutputStream
import javax.imageio.stream.MemoryCacheImageOutputStream
import java.awt.Graphics2D
import java.awt.image.BufferedImage


@Transactional
class ProductService {

  AdvancedSearchService advancedSearchService

  def list() {
    def result = Product.findAll()

    [success: true, data: result[0]]
  }

  def listAllProducts(ProductCommand cmd) {
    def result = Product.findAll()

//    cmd.additionalCriteria = Product.findAll()
//    advancedSearchService.search(cmd)

    [success: true, data: result]
  }

  def searchAllProducts(ProductCommand cmd) {

    def additionalCriteria = {
      if(cmd.id)
        eq('id', cmd.id)
      if(cmd.title)
        eq('title', cmd.title)
    }
    cmd.additionalCriteria = additionalCriteria
    advancedSearchService.search(cmd)
  }

  static String encodeToString(BufferedImage image, String type) {
    String imageString = null
    ByteArrayOutputStream bos = new ByteArrayOutputStream()

    try {
      ImageIO.write(image, type, bos)
      byte[] imageBytes = bos.toByteArray()

      BASE64Encoder encoder = new BASE64Encoder()
      imageString = encoder.encode(imageBytes)

      bos.close()
    } catch (IOException e) {
      e.printStackTrace()
    }
    return imageString
  }

  def create(ProductCommand cmd) {

    String tt = cmd.image.replace("data:image/jpeg;base64,/","/")

    byte[] imageByte
    BASE64Decoder decoder = new BASE64Decoder()
    imageByte = decoder.decodeBuffer(tt)
    ByteArrayInputStream bis = new ByteArrayInputStream(imageByte)
    BufferedImage image = ImageIO.read(bis)
    bis.close()

    BufferedImage resizedImage = resizeImage(image)

    ByteArrayOutputStream bos = new ByteArrayOutputStream()
    ImageOutputStream stream = new MemoryCacheImageOutputStream(bos)
    ImageIO.write(resizedImage, 'jpeg', stream)
    byte[] imageBytes = bos.toByteArray()
    stream.close()
    bos.close()
    BASE64Encoder encoder = new BASE64Encoder()
    String imageString = "data:image/jpeg;base64,"+encoder.encode(imageBytes)

    Product product = new Product(title: cmd.title, description: cmd.description,
        price: cmd.price, image: cmd.image, thumbnail: imageString)
    product.save()

    [success: true]
  }

  private static BufferedImage resizeImage(BufferedImage originalImage){
    BufferedImage resizedImage = new BufferedImage(200, 150, BufferedImage.TYPE_INT_RGB)
    Graphics2D g = resizedImage.createGraphics()
    g.drawImage(originalImage, 0, 0, 200, 150, null)
    g.dispose()

    return resizedImage
  }

  def update(ProductCommand cmd) {
    def result = Product.get(cmd.id)
    result.title = cmd.title
    result.description = cmd.description
    result.price = cmd.price
    result.save(flush: true)

    [success: true]
  }

  def delete(ProductCommand cmd) {
    def result = Product.get(cmd.id)
    result.delete()

    [success: true]
  }
}