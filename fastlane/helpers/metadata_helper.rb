require 'yaml'

class Metadata_helper

  def initialize()
    filePath = File.expand_path('./fastlane/Metadata.yml')
    unless File.file?(filePath)
      filePath = File.expand_path('./Metadata.yml')
      unless File.file?(filePath)
        filePath = File.expand_path('../fastlane/Metadata.yml')
      end
    end

    @metadata = YAML.load_file(filePath)

    @metadata["copyright"] = @metadata["copyright"].gsub("&current_year", Time.now.year.to_s)
  end

  def get_languages
    result = []
    @metadata["languages"].each do |key, value|
      result.push(key)
    end
    result
  end

  def get_language_property_hash(property)
    languages = @metadata["languages"]
    result = {}
    languages.each do |key, value|
      next unless value.key?(property)

      result[key] = value[property]
    end
    result
  end

  def get_property(property)
    @metadata[property]
  end

end
