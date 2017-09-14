package hr.addiko.riznica.core.infrastructure
import grails.core.GrailsDomainClass 
import grails.core.GrailsDomainClassProperty 
import grails.plugin.grich.core.command.EntityCommand 
import grails.util.Holders 
import org.grails.core.artefact.DomainClassArtefactHandler 
import org.joda.time.DateTime 
 
final class ModelUtils { 
 
  static copyPropertiesAll(def source, def target, List excludeProperties = [], List convertedPropertyTypes = [], List commandProperties = []) { 
    target.metaClass.properties.each { targetProperty -> 
      if (!excludeProperties.contains(targetProperty.name) && targetProperty.name != 'metaClass' && targetProperty.name != 'class' && hasProperty(source, targetProperty)) { 
        if (convertedPropertyTypes.contains(targetProperty.type)) { 
          targetProperty.setProperty(target, source.metaClass.getProperty(source, "${targetProperty.name}Converted")) 
        } 
        else if (commandProperties.contains(targetProperty.name)) { 
          def sourceValue = source.metaClass.getProperty(source, targetProperty.name) 
 
          if (sourceValue) { 
            def targetClassInstance = targetProperty.type.newInstance() 
            copyPropertiesAll(sourceValue, targetClassInstance) 
            targetProperty.setProperty(target, targetClassInstance) 
          } 
        } 
        else { 
          def sourceValue = source.metaClass.getProperty(source, targetProperty.name) 
 
          if (targetProperty.type.equals(Integer.class) && sourceValue instanceof String && sourceValue.matches(/^[0-9]+$/)) { 
            targetProperty.setProperty(target, Integer.valueOf(sourceValue)) 
          } 
          else { 
            targetProperty.setProperty(target, sourceValue) 
          } 
        } 
      } 
    } 
  } 
 
  // TODO agrancaric: test 
  static Map copyPersistentProperties(def source, def target, List excludeProperties = []) { 
    GrailsDomainClass domainClass = (GrailsDomainClass) Holders?.grailsApplication?.getArtefact(DomainClassArtefactHandler.TYPE, target.class.name) 
 
    Map changedProperties = [:] 
    domainClass.persistentProperties.each { GrailsDomainClassProperty targetProperty -> 
      if (!excludeProperties.contains(targetProperty.name) && hasPropertyOrKey(source, targetProperty.name)) { 
        String propertyName = targetProperty.name 
        def sourceValue = source[(propertyName)] 
 
        if (targetProperty.isAssociation() && isEntityCommand(sourceValue)) { 
          changedProperties << copyAssociationProperties(target, targetProperty, sourceValue) 
        } 
        else if (targetProperty.isAssociation() && sourceValue instanceof Collection) { 
          changedProperties << copyCollectionAssociationProperties(target, targetProperty, sourceValue) 
        } 
        else if (targetProperty.isEnum()) { 
          changedProperties << copyEnumProperty(target, targetProperty, sourceValue) 
        } 
        else if (isIntegerAsString(sourceValue) && targetProperty.type == Integer) { 
          changedProperties << copyIntegerProperty(target, targetProperty, sourceValue) 
        } 
        else if (isBigDecimalAsString(sourceValue) && targetProperty.type == BigDecimal) { 
          changedProperties << copyBigDecimalProperty(target, targetProperty, sourceValue) 
        } 
        else if (sourceValue && !targetProperty.type.isAssignableFrom(sourceValue.class)) { 
          def targetClassInstance = targetProperty.type.newInstance() 
          copyPersistentProperties(sourceValue, targetClassInstance) 
          if (target[(propertyName)] != targetClassInstance) { 
            changedProperties << [(propertyName): targetClassInstance] 
          } 
 
          target[(propertyName)] = targetClassInstance 
        } 
        else { 
          if (target[(propertyName)] != sourceValue) { 
            changedProperties << [(propertyName): sourceValue] 
          } 
          target[(propertyName)] = sourceValue 
        } 
      } 
    } 
    if (source.hasProperty("version")) { 
      target["version"] = source["version"] 
    } 
    changedProperties 
  } 
 
  static <T> T copyToClass(Class<T> resultClass, def entity) { 
    def destination = resultClass.newInstance() 
    copyPropertiesAll(entity, destination) 
    destination 
  } 
 
  static boolean allEntitiesEqual(Collection previousList, Collection currentList) { 
    previousList?.size() == currentList?.size() && previousList?.every { entity -> entity.id in currentList?.id } 
  } 
 
  private static Map copyAssociationProperties(def target, GrailsDomainClassProperty targetProperty, def sourceValue) { 
    String targetPropertyName = targetProperty.name 
    Map changedProperties = [:] 
 
    if (sourceValue instanceof Collection) { 
      def loadedCollection = sourceValue.collect { targetProperty.referencedPropertyType.load(it.id) } 
      def changed = loadedCollection?.findAll { loaded -> target[(targetPropertyName)]?.find { it.id == loaded.id } == null } 
      if (changed) { 
        changedProperties << [(targetPropertyName): changed] 
      } 
      target[(targetPropertyName)] = loadedCollection 
    } 
    else { 
      def loadedValue = targetProperty.referencedPropertyType.get(sourceValue.id) 
      if (target[(targetPropertyName)]?.id != sourceValue.id) { 
        changedProperties << [(targetPropertyName): loadedValue] 
      } 
      target[(targetPropertyName)] = loadedValue 
    } 
    changedProperties 
  } 
 
  private static Map copyCollectionAssociationProperties(def target, GrailsDomainClassProperty targetProperty, def sourceValue) { 
    String targetPropertyName = targetProperty.name 
    Class targetPropertyClass = targetProperty.referencedPropertyType 
 
    def updatedCollection = sourceValue.collect { 
      def instance = targetPropertyClass.newInstance() 
      copyPropertiesAll(it, instance) 
      instance 
    } 
    if (target[(targetPropertyName)] == null) { 
      target[(targetPropertyName)] = updatedCollection 
    } 
    else { 
      target[(targetPropertyName)].clear() 
      target[(targetPropertyName)].addAll(updatedCollection) 
    } 
 
    [(targetPropertyName): updatedCollection] 
  } 
 
  private static Map copyEnumProperty(def target, GrailsDomainClassProperty targetProperty, def sourceValue) { 
    String targetPropertyName = targetProperty.name 
    Map changedProperties = [:] 
 
    def convertedValue = sourceValue ? Enum.valueOf(targetProperty.type, sourceValue) : null 
    if (convertedValue != target[(targetPropertyName)]) { 
      changedProperties << [(targetPropertyName): convertedValue] 
    } 
    target[(targetPropertyName)] = convertedValue 
 
    changedProperties 
  } 
 
  private static Map copyIntegerProperty(def target, GrailsDomainClassProperty targetProperty, def sourceValue) { 
    String propertyName = targetProperty.name 
    Map changedProperties = [:] 
 
    def convertedValue = Integer.valueOf(sourceValue) 
    if (target[(propertyName)] != convertedValue) { 
      changedProperties << [(propertyName): convertedValue] 
    } 
    target[(propertyName)] = convertedValue 
 
    changedProperties 
  } 
 
  private static Map copyBigDecimalProperty(def target, GrailsDomainClassProperty targetProperty, def sourceValue) { 
    String propertyName = targetProperty.name 
    Map changedProperties = [:] 
 
    def convertedValue = new BigDecimal(sourceValue.replace('.', '').replace(',', '.')) 
    if (target[(propertyName)] != convertedValue) { 
      changedProperties << [(propertyName): convertedValue] 
    } 
    target[(propertyName)] = convertedValue 
 
    changedProperties 
  } 
 
  private static boolean isEntityCommand(def data) { 
    boolean isEntityCommand 
    if (data && data instanceof Collection) { 
      isEntityCommand = data.every { it instanceof EntityCommand } 
    } 
    else { 
      isEntityCommand = data instanceof EntityCommand 
    } 
    isEntityCommand 
  } 
 
  private static boolean hasProperty(def source, def targetProperty) { 
    (source.metaClass.hasProperty(source, targetProperty.name) && source.respondsTo(targetProperty.getSetterName(targetProperty.name))) || 
            (source.metaClass.hasProperty(source, "${targetProperty.name}Formatted") && source.respondsTo(targetProperty.getSetterName("${targetProperty.name}Formatted"))) 
  } 
 
  public static Date lastTimeStampInDay(Date date) { 
    if (date) { 
      return new DateTime(date).plusHours(23).plusMinutes(59).plusSeconds(59).toDate() 
    } 
    return date 
  } 
 
  private static hasPropertyOrKey(def source, String property) { 
    if (source instanceof Map) { 
      return source.containsKey(property) 
    } 
    source.hasProperty(property) 
  } 
} 