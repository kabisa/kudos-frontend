source 'https://rubygems.org'
ruby '2.4.3'

group :development do
  gem 'bundler', '~> 1.17', '>= 1.17.3'
  gem 'fastlane', '~> 2.112.0.beta.20181216200018'
  gem 'xcodeproj'

  gem 'nokogiri'
  gem 'dotenv'
  gem 'pbxplorer'

  # Merge Fastlane plugins
  plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
  eval_gemfile(plugins_path) if File.exist?(plugins_path)
end
