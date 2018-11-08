#!/usr/bin/env ruby
# share_schemes.rb

require 'xcodeproj'
require 'fileutils'

cordova_folder = File.expand_path("")
fastlane_folder = File.expand_path("../fastlane")

require "#{fastlane_folder}/helpers/metadata_helper.rb"
helper = Metadata_helper.new

app_name = helper.get_property('app_name')


FileUtils.cp_r("#{cordova_folder}/platforms/ios/#{app_name}.xcworkspace/.", "#{cordova_folder}/platforms/ios/#{app_name}.xcodeproj")
