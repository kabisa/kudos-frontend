#!/usr/bin/env ruby
# prepare_screengrab.rb

require 'fileutils'

def replace_in_file(file, text, replace)
  file_contents = File.read(file)
  new_contents = file_contents.gsub(text, replace)

  # To write changes to the file, use:
  File.open(file, "w") {|file| file.puts new_contents }
end

cordova_folder = File.expand_path("")
fastlane_folder = File.expand_path("../fastlane")

require "#{fastlane_folder}/helpers/metadata_helper.rb"
helper = Metadata_helper.new

package_name = helper.get_property('app_identifier')

target_path = "#{cordova_folder}/platforms/android/androidTest/java/#{package_name.gsub(".", "/")}/"
test_class_file = "#{fastlane_folder}/screenshot_classes/android/ui-tests/MainActivityTest.java"
gradle_file ="#{fastlane_folder}/screenshot_classes/android/ui-tests/build-extras.gradle"

replace_in_file(test_class_file , "nl.kabisa.mobilebuildtest", package_name)

FileUtils.mkdir_p(target_path)

FileUtils.cp_r(test_class_file, target_path)
FileUtils.cp(gradle_file, "#{cordova_folder}/platforms/android/build-extras.gradle")
