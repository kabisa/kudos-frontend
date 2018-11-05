#!/usr/bin/env ruby
# target_attributes.rb

require 'JSON'
require 'pbxplorer'

cordova_folder = File.expand_path("")
fastlane_folder = File.expand_path("../fastlane")

require "#{fastlane_folder}/helpers/metadata_helper.rb"
helper = Metadata_helper.new

app_name = helper.get_property('app_name')
team_id = helper.get_property('team_id')

pbxproj = "#{cordova_folder}/platforms/ios/#{app_name}.xcodeproj/project.pbxproj"

proj_obj = XCProjectFile.new pbxproj

configs = proj_obj.objects_of_class XCBuildConfiguration

configs.each do|config|
  if config["name"] == "Release"
    config["buildSettings"]["DEVELOPMENT_TEAM"] = team_id
  end
end

product_reference = proj_obj.project.targets[0].uuid

target_attributes = {"#{product_reference}"=>{"SystemCapabilities"=>{"com.apple.Push"=>{"enabled"=>"1"}}, "DevelopmentTeam"=>"#{team_id}"}}
proj_obj.project["attributes"]["TargetAttributes"] = target_attributes

proj_obj.save
